import React, { useState } from 'react';
import {
  MessageSquare,
  X,
  Send,
} from 'lucide-react';
import { useOSStore } from '../../store/useOSStore';
import { GTAOSHeader } from '../../os/components/GTAOSHeader';
import { GTAOSSearchBar } from '../../os/components/GTAOSSearchBar';
import { GTAOSButton } from '../../os/components/GTAOSButton';
import { Contact } from '../../types';

export const ContactsApp: React.FC = () => {
  const contacts = useOSStore((s) => s.contacts);
  const sendSMS = useOSStore((s) => s.sendSMS);

  const [search, setSearch] = useState('');
  const [activeChat, setActiveChat] = useState<Contact | null>(null);
  const [selectedContactProfile, setSelectedContactProfile] = useState<Contact | null>(null);
  const [messageInput, setMessageInput] = useState('');

  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.role.toLowerCase().includes(search.toLowerCase()) ||
      c.district.toLowerCase().includes(search.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!activeChat || !messageInput.trim()) return;
    sendSMS(activeChat.id, messageInput);
    setMessageInput('');
  };

  // Active Chat Screen
  if (activeChat) {
    const liveContact = contacts.find((c) => c.id === activeChat.id) || activeChat;

    return (
      <div className="relative w-full h-full flex flex-col bg-[#0F0D24] text-white overflow-hidden select-none">
        {/* Chat Header */}
        <GTAOSHeader
          title={liveContact.name}
          subtitle={liveContact.role}
          showBack={true}
          onBack={() => setActiveChat(null)}
        />

        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
          {liveContact.messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                    isUser
                      ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-br-none shadow-md shadow-pink-500/20'
                      : 'bg-[#1D173A] text-white/95 rounded-bl-none border border-white/10'
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
                <span className="text-[9px] text-white/40 font-mono mt-1 px-1">{msg.time}</span>
              </div>
            );
          })}
        </div>

        {/* Quick Branch Reply Suggestions */}
        <div className="px-3 py-1.5 bg-[#140F2E] border-t border-white/5 flex items-center space-x-1.5 overflow-x-auto no-scrollbar">
          {['Ready when you are.', 'Send the coordinates.', 'Need more firepower for this score.'].map(
            (suggestion) => (
              <button
                key={suggestion}
                onClick={() => sendSMS(liveContact.id, suggestion)}
                className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 text-[10px] text-pink-300 border border-white/10 whitespace-nowrap"
              >
                {suggestion}
              </button>
            )
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-[#171236] border-t border-white/10 flex items-center space-x-2">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={`Message ${liveContact.name.split(' ')[0]}...`}
            className="flex-1 bg-[#100C24] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-pink-500/60"
          />
          <button
            onClick={handleSendMessage}
            className="p-2.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white transition-colors"
          >
            <Send size={15} />
          </button>
        </div>
      </div>
    );
  }

  // Contacts List View
  return (
    <div className="relative w-full h-full flex flex-col bg-[#0F0D24] text-white overflow-hidden select-none">
      {/* Header */}
      <GTAOSHeader
        title="Messages"
        subtitle={`${contacts.length} Syndicate Entries`}
        accentColor="#10B981"
      />

      {/* Search Bar */}
      <div className="px-4 py-2.5 bg-[#171236] border-b border-white/10">
        <GTAOSSearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search Lucia, arms dealer, cabs..."
        />
      </div>

      {/* Contacts List */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2.5 no-scrollbar">
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            onClick={() => setSelectedContactProfile(contact)}
            className="flex items-center justify-between p-3 rounded-2xl bg-[#1C1738]/70 hover:bg-[#1C1738] border border-white/5 hover:border-pink-500/30 transition-all cursor-pointer"
          >
            <div className="flex items-center space-x-3 overflow-hidden">
              <div className="relative">
                <img
                  src={contact.avatar}
                  alt={contact.name}
                  className="w-10 h-10 rounded-full object-cover border border-white/15"
                />
                <div
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#1C1738] ${
                    contact.status === 'Online'
                      ? 'bg-emerald-500'
                      : contact.status === 'Busy'
                      ? 'bg-amber-500'
                      : 'bg-gray-500'
                  }`}
                />
              </div>

              <div className="overflow-hidden">
                <div className="flex items-center space-x-1.5">
                  <h4 className="text-xs font-bold text-white truncate">{contact.name}</h4>
                  {contact.alias && (
                    <span className="text-[10px] text-pink-400 font-semibold">({contact.alias})</span>
                  )}
                </div>
                <p className="text-[10px] text-white/50 truncate">{contact.role}</p>
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="flex items-center shrink-0" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setActiveChat(contact)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 text-pink-400 flex items-center justify-center border border-white/10"
                title="Send Message"
              >
                <MessageSquare size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Profile Modal */}
      {selectedContactProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-sm bg-[#1A1433] border border-pink-500/40 rounded-3xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-[10px] uppercase tracking-wider font-bold text-pink-400">
                Contact Dossier
              </span>
              <button
                onClick={() => setSelectedContactProfile(null)}
                className="p-1 rounded-full text-white/50 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex flex-col items-center text-center space-y-2">
              <img
                src={selectedContactProfile.avatar}
                alt={selectedContactProfile.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-pink-500 shadow-lg shadow-pink-500/30"
              />
              <h3 className="text-sm font-bold text-white">{selectedContactProfile.name}</h3>
              <p className="text-xs text-pink-300">{selectedContactProfile.role}</p>
              <p className="text-[10px] text-white/50 font-mono">{selectedContactProfile.phone}</p>
            </div>

            <p className="text-xs text-white/80 leading-relaxed bg-white/5 p-3 rounded-2xl">
              {selectedContactProfile.bio}
            </p>

            <GTAOSButton
              fullWidth
              variant="primary"
              icon={<MessageSquare size={14} />}
              onClick={() => {
                setActiveChat(selectedContactProfile);
                setSelectedContactProfile(null);
              }}
            >
              Send Message
            </GTAOSButton>
          </div>
        </div>
      )}
    </div>
  );
};
