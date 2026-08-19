import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Plus,
  ArrowUp,
  ArrowDown,
  Trash2,
  Edit2,
  Check,
  X,
  Sparkles,
  HelpCircle,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react';
import { suggestedQuestionsLibrary } from '../../data/initialData';
import { BookingQuestion } from '../../types';

export const QuestionsCMSTab: React.FC = () => {
  const {
    bookingQuestions,
    addBookingQuestion,
    updateBookingQuestion,
    deleteBookingQuestion,
    toggleBookingQuestionEnabled,
    reorderBookingQuestion,
    addSuggestedQuestion,
  } = useApp();

  const [isAddingCustom, setIsAddingCustom] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // New question form state
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newPlaceholder, setNewPlaceholder] = useState('');
  const [newType, setNewType] = useState<'text' | 'select' | 'textarea'>('text');
  const [newRequired, setNewRequired] = useState(false);
  const [newOptionsStr, setNewOptionsStr] = useState('');

  const sortedQuestions = [...bookingQuestions].sort((a, b) => a.order - b.order);

  const handleSaveNewQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;

    addBookingQuestion({
      question: newQuestionText,
      placeholder: newPlaceholder,
      type: newType,
      options: newType === 'select' ? newOptionsStr.split(',').map((s) => s.trim()).filter(Boolean) : undefined,
      required: newRequired,
      enabled: true,
      category: 'look',
    });

    setNewQuestionText('');
    setNewPlaceholder('');
    setNewOptionsStr('');
    setIsAddingCustom(false);
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif-editorial text-3xl text-[#1E1B18] font-normal">
            Bespoke Booking Questionnaire Builder
          </h2>
          <p className="text-xs text-[#6B6158] font-light mt-0.5">
            Tailor the exact questions clients answer when booking. Changes update live in the client booking wizard.
          </p>
        </div>

        <button
          onClick={() => setIsAddingCustom(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1E1B18] text-[#FAF8F5] text-xs font-semibold hover:bg-[#322D28] transition-all shadow-sm cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 text-[#C8A97E]" />
          <span>Add Custom Question</span>
        </button>
      </div>

      {/* Suggested Questions Library (1-Click Insertion) */}
      <div className="p-6 rounded-3xl bg-[#FAF5ED] border border-[#E6DDD2] space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#7C6345]">
            Suggested Questions Library (1-Click Add)
          </h3>
        </div>

        <p className="text-xs text-[#6B6158]">
          Pre-tested luxury consultation questions. Click any card to instantly add it to your live client booking form:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {suggestedQuestionsLibrary.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-white border border-[#E4D9CC] shadow-xs flex flex-col justify-between hover:border-[#C8A97E] transition-all group"
            >
              <div className="text-xs font-medium text-[#1E1B18] mb-3 leading-snug">
                "{item.question}"
              </div>
              <button
                type="button"
                onClick={() => addSuggestedQuestion(idx)}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF8F5] group-hover:bg-[#1E1B18] text-[#1E1B18] group-hover:text-white border border-[#D9D0C5] text-[11px] font-semibold transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add to Booking Form</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Add Custom Question Modal / Form Box */}
      {isAddingCustom && (
        <form
          onSubmit={handleSaveNewQuestion}
          className="p-6 rounded-3xl bg-white border-2 border-[#C8A97E] shadow-xl space-y-4 animate-in fade-in"
        >
          <div className="flex items-center justify-between pb-3 border-b border-[#EFEAE3]">
            <h3 className="font-serif-editorial text-xl text-[#1E1B18]">
              Create New Custom Booking Question
            </h3>
            <button
              type="button"
              onClick={() => setIsAddingCustom(false)}
              className="text-[#8C7A6B] hover:text-[#1E1B18]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6158] mb-1">
                Question Text *
              </label>
              <input
                type="text"
                placeholder="e.g. What is your wedding theme and bridal attire color?"
                value={newQuestionText}
                onChange={(e) => setNewQuestionText(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-[#D9D0C5] text-xs text-[#1E1B18] focus:outline-none focus:border-[#C8A97E]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6158] mb-1">
                Input Type
              </label>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value as any)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#D9D0C5] text-xs text-[#1E1B18] focus:outline-none focus:border-[#C8A97E]"
              >
                <option value="text">Short Text Answer</option>
                <option value="textarea">Paragraph / Detailed Text</option>
                <option value="select">Dropdown Choices</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6158] mb-1">
                Placeholder Hint
              </label>
              <input
                type="text"
                placeholder="e.g. Enter details here..."
                value={newPlaceholder}
                onChange={(e) => setNewPlaceholder(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#D9D0C5] text-xs text-[#1E1B18] focus:outline-none focus:border-[#C8A97E]"
              />
            </div>

            {newType === 'select' && (
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6158] mb-1">
                  Dropdown Options (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ivory & Gold, Emerald & Bronze, Silver & Platinum"
                  value={newOptionsStr}
                  onChange={(e) => setNewOptionsStr(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#D9D0C5] text-xs text-[#1E1B18] focus:outline-none focus:border-[#C8A97E]"
                />
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#EFEAE3]">
            <label className="flex items-center gap-2 text-xs font-medium text-[#1E1B18] cursor-pointer">
              <input
                type="checkbox"
                checked={newRequired}
                onChange={(e) => setNewRequired(e.target.checked)}
                className="rounded text-[#1E1B18]"
              />
              <span>Mark as required response for clients</span>
            </label>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsAddingCustom(false)}
                className="px-4 py-2 rounded-lg text-xs text-[#6B6158] hover:text-[#1E1B18]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-full bg-[#1E1B18] text-white text-xs font-semibold hover:bg-[#322D28]"
              >
                Save & Enable Question
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Live Form Questions List */}
      <div className="bg-white rounded-3xl border border-[#E0D7CC] shadow-sm overflow-hidden p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between border-b border-[#EFEAE3] pb-4">
          <div>
            <h3 className="font-serif-editorial text-2xl text-[#1E1B18] font-normal">
              Active Questionnaire Order ({sortedQuestions.length} Questions)
            </h3>
            <p className="text-xs text-[#6B6158] font-light">
              Use arrows to change sequence, or toggle off to hide from the client booking flow without deleting.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {sortedQuestions.map((q, index) => (
            <div
              key={q.id}
              className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                q.enabled ? 'bg-[#FAF8F5] border-[#E2D8CC]' : 'bg-gray-50 border-gray-200 opacity-60'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#1E1B18] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                  {index + 1}
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#1E1B18] flex items-center gap-2">
                    <span>{q.question}</span>
                    {q.required && (
                      <span className="text-[10px] text-[#C8A97E] uppercase font-bold tracking-wider">
                        Required
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-[#8C7A6B] mt-0.5">
                    Type: <strong className="font-medium text-[#4A433D]">{q.type}</strong> {q.placeholder ? `• Hint: "${q.placeholder}"` : ''}
                  </div>
                  {q.options && (
                    <div className="text-[11px] text-[#6B6158] mt-1 flex flex-wrap gap-1">
                      {q.options.map((opt, oi) => (
                        <span key={oi} className="bg-white px-2 py-0.5 rounded border border-[#E0D7CC]">
                          {opt}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                {/* Reorder Up */}
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => reorderBookingQuestion(q.id, 'up')}
                  className="p-1.5 rounded-lg border border-[#D9D0C5] hover:bg-white text-[#6B6158] disabled:opacity-30 disabled:pointer-events-none"
                  title="Move question up"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>

                {/* Reorder Down */}
                <button
                  type="button"
                  disabled={index === sortedQuestions.length - 1}
                  onClick={() => reorderBookingQuestion(q.id, 'down')}
                  className="p-1.5 rounded-lg border border-[#D9D0C5] hover:bg-white text-[#6B6158] disabled:opacity-30 disabled:pointer-events-none"
                  title="Move question down"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>

                {/* Toggle Enabled */}
                <button
                  type="button"
                  onClick={() => toggleBookingQuestionEnabled(q.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                    q.enabled
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {q.enabled ? 'Active' : 'Disabled'}
                </button>

                {/* Delete */}
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Delete this question from your client booking form?')) {
                      deleteBookingQuestion(q.id);
                    }
                  }}
                  className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Delete question"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
