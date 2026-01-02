
import React, { useState, useEffect, useRef, useContext } from "react";
import { ChatContext } from "../Chatcontext/ChateContext";
import { AuthContext } from "../auth/AuthContext";
import { toast } from "react-toastify";

const EmployeeChat = () => {
  const { user, admins, fetchAdmins } = useContext(AuthContext);
  const {
    messages,
    loading,
    sendMessage,
    getConversation,
    markAsRead,
    setMessages,
    editMessage,
    deleteForMe,
    deleteForEveryone,
  } = useContext(ChatContext);

  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => { fetchAdmins(); }, []);

  useEffect(() => {
    if (!selectedAdmin) return;
    setMessages([]);
    const fetchChat = async () => {
      try {
        await getConversation(selectedAdmin.id);
        await markAsRead(selectedAdmin.id);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch chat");
      }
    };
    fetchChat();
  }, [selectedAdmin]);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const handleSend = async () => {
    const text = newMessage.trim();
    if (!text || !selectedAdmin) return;
    setNewMessage("");
    try { await sendMessage(selectedAdmin.id, text); } 
    catch (err) { console.error(err); toast.error("Message send failed"); }
  };

  const handleEditSave = async (msgId) => {
    const text = editText.trim();
    if (!text) return;

    try {
      await editMessage(msgId, text);
      setMessages(prev => prev.map(m => m.id === msgId ? { ...m, message: text } : m));
      setEditingId(null);
      setEditText("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to edit message");
    }
  };

  const handleKeyPressSend = (e) => { if (e.key === "Enter") handleSend(); };
  const handleKeyPressEdit = (e, msgId) => { if (e.key === "Enter") handleEditSave(msgId); };

  const getUnreadCount = (adminId) =>
    messages.filter(m => Number(m.sender_id) === Number(adminId) && m.read_status !== "read").length;

  return (
    <div className="flex h-screen bg-[#e5ddd5]">
      {/* Sidebar */}
      <div className="w-1/3 bg-white border-r overflow-y-auto">
        <h2 className="p-4 font-semibold border-b">Admins</h2>
        {admins.map(admin => {
          const unread = getUnreadCount(admin.id);
          return (
            <div
              key={admin.id}
              onClick={() => setSelectedAdmin(admin)}
              className={`p-4 cursor-pointer flex justify-between border-b hover:bg-gray-100 ${
                selectedAdmin?.id === admin.id ? "bg-green-100" : ""
              }`}
            >
              <span>{admin.name}</span>
              {unread > 0 && (
                <span className="bg-red-500 text-white rounded-full px-2 py-0.5 text-xs">{unread}</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b bg-white">
          <h2 className="font-bold text-gray-700">
            {selectedAdmin ? selectedAdmin.name : "Select an admin to start chat"}
          </h2>
        </div>

        <div className="flex-1 p-4 overflow-y-auto flex flex-col space-y-2">
          {!selectedAdmin ? (
            <p className="text-center text-gray-500">Select an admin to start chat</p>
          ) : loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : messages.length === 0 ? (
            <p className="text-center text-gray-500">No messages</p>
          ) : (
            messages
              .slice()
              .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
              .map(msg => {
                const isMe = Number(msg.sender_id) === Number(user.id);
                const isEditing = editingId === msg.id;

                return (
                  <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                    <div className={`px-3 py-2 rounded-lg max-w-xs shadow text-sm break-words relative ${
                      isMe ? "bg-[#dcf8c6] rounded-br-none" : "bg-white rounded-bl-none"
                    }`}>
                      {isEditing ? (
                        <input
                          value={editText}
                          onChange={e => setEditText(e.target.value)}
                          onKeyDown={e => handleKeyPressEdit(e, msg.id)}
                          onBlur={() => setEditingId(null)}
                          autoFocus
                          className="border rounded px-2 py-1 w-full"
                        />
                      ) : (
                        <span>{msg.message}</span>
                      )}

                      <div className="text-[10px] text-gray-500 text-right mt-1">
                        {new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        {isMe && (msg.read_status === "read" ? "✔✔" : "✔")}
                      </div>

                      {/* Edit/Delete buttons only for own messages */}
                      {isMe && !isEditing && (
                        <div className="flex gap-2 mt-1">
                          <button
                            className="text-blue-500 text-xs"
                            onClick={() => { setEditingId(msg.id); setEditText(msg.message); }}
                          >
                            Edit
                          </button>

                          <button
                            className="text-red-500 text-xs"
                            onClick={async () => {
                              try {
                                await deleteForMe(msg.id);
                                setMessages(prev => prev.filter(m => m.id !== msg.id));
                              } catch (err) { toast.error("Failed to delete for me"); }
                            }}
                          >
                            Delete For Me
                          </button>

                          <button
                            className="text-red-700 text-xs"
                            onClick={async () => {
                              try {
                                await deleteForEveryone(msg.id);
                                setMessages(prev => prev.filter(m => m.id !== msg.id));
                              } catch (err) { toast.error("Failed to delete for everyone"); }
                            }}
                          >
                            Delete For Everyone
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        {selectedAdmin && (
          <div className="p-3 bg-white border-t flex gap-2">
            <input
              type="text"
              placeholder="Type a message"
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPressSend}
              className="flex-1 border rounded-full px-4 py-2 outline-none"
            />
            <button
              onClick={handleSend}
              className="bg-green-500 text-white px-5 py-2 rounded-full"
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeChat;
