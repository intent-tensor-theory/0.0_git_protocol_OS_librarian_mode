// ============================================
// CONTACT MANAGER COMPONENT
// ============================================

import React, { useState } from 'react';
import type { Contact } from '@/types';
import { generateId } from '@/utils/serialGenerator';
import { GlassPane } from '../ui/GlassPane';
import { GlassButton } from '../ui/GlassButton';
import { GlassInput } from '../ui/GlassInput';
import { GlassTextarea } from '../ui/GlassTextarea';

type ContactManagerProps = {
  contacts: Contact[];
  onSaveContact: (contact: Contact) => void;
  onDeleteContact: (contactId: string) => void;
};

export const ContactManager: React.FC<ContactManagerProps> = ({
  contacts,
  onSaveContact,
  onDeleteContact,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [notes, setNotes] = useState('');

  const resetForm = () => {
    setName('');
    setEmail('');
    setRole('');
    setNotes('');
    setIsAdding(false);
    setEditingId(null);
  };

  const handleEdit = (contact: Contact) => {
    setName(contact.name);
    setEmail(contact.email || '');
    setRole(contact.role || '');
    setNotes(contact.notes || '');
    setEditingId(contact.id);
    setIsAdding(true);
  };

  const handleSave = () => {
    if (!name.trim()) return;

    const contact: Contact = {
      id: editingId || generateId(),
      name: name.trim(),
      email: email.trim() || undefined,
      role: role.trim() || undefined,
      notes: notes.trim() || undefined,
      createdAt: editingId
        ? contacts.find((c) => c.id === editingId)?.createdAt || new Date()
        : new Date(),
      updatedAt: new Date(),
    };

    onSaveContact(contact);
    resetForm();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold text-cyan-300">Human Contacts</h4>
          <p className="text-xs text-gray-400">
            People you work with or escalate to
          </p>
        </div>
        {!isAdding && (
          <GlassButton
            size="sm"
            variant="primary"
            onClick={() => setIsAdding(true)}
          >
            ➕ Add Contact
          </GlassButton>
        )}
      </div>

      {/* Add/Edit Form */}
      {isAdding && (
        <GlassPane className="space-y-3">
          <h5 className="text-xs font-bold text-gray-300">
            {editingId ? 'Edit Contact' : 'New Contact'}
          </h5>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-400 mb-1">
                Name <span className="text-red-400">*</span>
              </label>
              <GlassInput
                value={name}
                onChange={setName}
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Email</label>
              <GlassInput
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">Role</label>
            <GlassInput
              value={role}
              onChange={setRole}
              placeholder="Support Lead, Manager, etc."
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">Notes</label>
            <GlassTextarea
              value={notes}
              onChange={setNotes}
              placeholder="When to escalate, availability, etc."
              rows={2}
            />
          </div>

          <div className="flex gap-2">
            <GlassButton size="sm" variant="ghost" onClick={resetForm}>
              Cancel
            </GlassButton>
            <GlassButton
              size="sm"
              variant="primary"
              onClick={handleSave}
              disabled={!name.trim()}
            >
              {editingId ? 'Update' : 'Add'} Contact
            </GlassButton>
          </div>
        </GlassPane>
      )}

      {/* Contact List */}
      {contacts.length === 0 && !isAdding ? (
        <GlassPane className="text-center py-6">
          <div className="text-3xl mb-2">👥</div>
          <p className="text-xs text-gray-500">No contacts added yet</p>
        </GlassPane>
      ) : (
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {contacts.map((contact) => (
            <GlassPane
              key={contact.id}
              className="flex items-center justify-between"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-lg">👤</span>
                  <p className="text-sm text-white font-medium truncate">
                    {contact.name}
                  </p>
                  {contact.role && (
                    <span className="text-[10px] px-1.5 py-0.5 bg-purple-500/20 text-purple-300 rounded">
                      {contact.role}
                    </span>
                  )}
                </div>
                {contact.email && (
                  <p className="text-xs text-gray-500 ml-7">{contact.email}</p>
                )}
              </div>

              <div className="flex items-center gap-1 ml-2">
                <button
                  onClick={() => handleEdit(contact)}
                  className="p-1 text-gray-400 hover:text-cyan-300 rounded"
                  title="Edit"
                >
                  ✏️
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete contact "${contact.name}"?`)) {
                      onDeleteContact(contact.id);
                    }
                  }}
                  className="p-1 text-gray-400 hover:text-red-400 rounded"
                  title="Delete"
                >
                  🗑️
                </button>
              </div>
            </GlassPane>
          ))}
        </div>
      )}
    </div>
  );
};
