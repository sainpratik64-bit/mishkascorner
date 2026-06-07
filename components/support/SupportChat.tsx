'use client';

import { useState } from 'react';
import { MessageCircle, MessageSquare, X } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

const QUICK_ACTIONS = [
  { emoji: '🔄', label: 'Return or exchange an item' },
  { emoji: '📦', label: "Where's my order?" },
  { emoji: '🚚', label: 'Shipping & delivery info' },
  { emoji: '🛍️', label: 'Help me find a product' },
  { emoji: '🏷️', label: 'Any deals or codes?' },
] as const;

interface SupportForm {
  fullName: string;
  phone: string;
  message: string;
}

const EMPTY_FORM: SupportForm = {
  fullName: '',
  phone: '',
  message: '',
};

export function SupportChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<SupportForm>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateField = (field: keyof SupportForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleQuickAction = (label: string) => {
    updateField('message', label);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = form.fullName.trim();
    const phone = form.phone.trim();
    const message = form.message.trim();

    if (!name || !phone || !message) {
      setError('Please fill in all required fields.');
      return;
    }

    if (!/^\d{10}$/.test(phone.replace(/\s/g, ''))) {
      setError('Enter a valid 10-digit phone number.');
      return;
    }

    setSubmitted(true);
    setError(null);
  };

  const resetChat = () => {
    setForm(EMPTY_FORM);
    setSubmitted(false);
    setError(null);
  };

  const closePanel = () => {
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-4 left-4 z-50 flex flex-col items-start gap-3">
      {isOpen && (
        <div
          role="dialog"
          aria-label="Mishkas Corner Support"
          className="flex w-[min(100vw-2rem,380px)] max-h-[min(85vh,720px)] flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_8px_40px_rgba(0,0,0,0.12)]"
        >
          <header className="flex items-start justify-between gap-3 border-b border-black/8 px-4 py-4">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-black text-xs font-bold uppercase tracking-wide text-white">
                MC
              </div>
              <div>
                <p className="text-sm font-semibold normal-case text-brand-black">
                  Mishkas Corner Support
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-brand-muted">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Online
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Minimize support chat"
                onClick={closePanel}
                className="rounded-full p-1.5 text-brand-muted transition-colors hover:bg-black/5 hover:text-brand-black"
              >
                <MessageSquare className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Close support chat"
                onClick={closePanel}
                className="rounded-full p-1.5 text-brand-muted transition-colors hover:bg-black/5 hover:text-brand-black"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto px-4 py-4">
            {!submitted ? (
              <>
                <div className="mb-4 inline-block max-w-[90%] rounded-2xl rounded-tl-sm bg-gray-100 px-4 py-3 text-sm normal-case text-brand-black">
                  Hey 👋 How can we help?
                </div>

                <div className="mb-4 flex flex-wrap gap-2">
                  {QUICK_ACTIONS.map((action) => (
                    <button
                      key={action.label}
                      type="button"
                      onClick={() => handleQuickAction(action.label)}
                      className="rounded-full border border-black/10 bg-white px-3 py-2 text-left text-xs font-normal normal-case text-brand-black transition-colors hover:border-black/20 hover:bg-gray-50"
                    >
                      <span className="mr-1.5">{action.emoji}</span>
                      {action.label}
                    </button>
                  ))}
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="rounded-2xl border border-black/8 bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
                >
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="support-name">
                        Full Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="support-name"
                        placeholder="Enter your full name"
                        value={form.fullName}
                        onChange={(e) => updateField('fullName', e.target.value)}
                        className="rounded-lg border-black/15 bg-gray-50/80 normal-case"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="support-phone">
                        Phone Number <span className="text-red-500">*</span>
                      </Label>
                      <div className="flex overflow-hidden rounded-lg border border-black/15 bg-gray-50/80">
                        <div className="flex shrink-0 items-center gap-1.5 border-r border-black/10 px-3 text-sm normal-case text-brand-black">
                          <span aria-hidden="true">🇮🇳</span>
                          <span>+91</span>
                        </div>
                        <Input
                          id="support-phone"
                          type="tel"
                          inputMode="numeric"
                          placeholder="98765 43210"
                          value={form.phone}
                          onChange={(e) =>
                            updateField(
                              'phone',
                              e.target.value.replace(/[^\d\s]/g, '')
                            )
                          }
                          className="border-0 bg-transparent focus-visible:ring-0"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <Label htmlFor="support-message">
                          Message <span className="text-red-500">*</span>
                        </Label>
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium normal-case text-emerald-700">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          Available • Instant Reply
                        </span>
                      </div>
                      <Textarea
                        id="support-message"
                        placeholder="How can we help you today? We respond almost immediately!"
                        value={form.message}
                        onChange={(e) => updateField('message', e.target.value)}
                        className="rounded-lg border-black/15 bg-gray-50/80"
                      />
                    </div>

                    {error && (
                      <p className="text-xs normal-case text-red-600">{error}</p>
                    )}

                    <button
                      type="submit"
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#9ca3af] px-4 py-3 text-sm font-medium normal-case text-white transition-colors hover:bg-[#6b7280]"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Start Chat
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="space-y-4 py-2 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50">
                  <MessageCircle className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold normal-case">
                    Thanks, {form.fullName.split(' ')[0]}!
                  </p>
                  <p className="mt-2 text-sm normal-case text-brand-muted">
                    We&apos;ve received your message and will reply on{' '}
                    <span className="font-medium text-brand-black">
                      +91 {form.phone.trim()}
                    </span>{' '}
                    shortly.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={resetChat}
                  className="text-sm font-medium normal-case text-brand-black underline-offset-2 hover:underline"
                >
                  Send another message
                </button>
              </div>
            )}
          </div>

          <footer className="border-t border-black/8 px-4 py-3 text-center">
            <p className="text-[11px] normal-case text-brand-muted">
              Powered by Mishkas Corner
            </p>
          </footer>
        </div>
      )}

      <button
        type="button"
        aria-label={isOpen ? 'Close support chat' : 'Open support chat'}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className={cn(
          'flex items-center gap-2 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-transform hover:scale-[1.02]',
          isOpen
            ? 'h-11 w-11 justify-center bg-brand-black text-white'
            : 'bg-brand-black px-4 py-3 text-sm font-medium normal-case text-white'
        )}
      >
        {isOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <>
            <MessageCircle className="h-5 w-5" />
            <span className="hidden sm:inline">Support</span>
          </>
        )}
      </button>
    </div>
  );
}
