import React, { useState } from 'react';
import { apiClient } from '../services/api';

interface LeadFormProps {
  source?: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export const LeadForm: React.FC<LeadFormProps> = ({
  source = 'website',
  onSuccess,
  onError,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await apiClient.submitLead({
        name: name.trim(),
        email: email.trim(),
        source,
      });

      if (response.error) {
        const errorMsg = response.message || 'Erro ao enviar formulário';
        setMessage({ type: 'error', text: errorMsg });
        onError?.(errorMsg);
      } else {
        setMessage({
          type: 'success',
          text: 'Obrigado! Verifique seu email para continuar.',
        });
        setName('');
        setEmail('');
        onSuccess?.();
      }
    } catch (err) {
      const errorMsg = 'Erro de conexão. Tente novamente.';
      setMessage({ type: 'error', text: errorMsg });
      onError?.(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card p-8 rounded-2xl max-w-md mx-auto">
      <h3 className="text-2xl font-display font-bold mb-6 text-white">Envie seu Email</h3>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Nome</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            placeholder="Seu nome"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            placeholder="seu@email.com"
          />
        </div>
      </div>

      {message && (
        <div
          className={`p-4 rounded-lg mb-6 text-sm ${
            message.type === 'success'
              ? 'bg-green-500/20 text-green-300 border border-green-500/30'
              : 'bg-red-500/20 text-red-300 border border-red-500/30'
          }`}
        >
          {message.text}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full gold-gradient text-slate-950 py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-amber-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Enviando...' : 'Enviar'}
      </button>

      <p className="text-xs text-slate-500 text-center mt-4">
        Respeitamos sua privacidade.
      </p>
    </form>
  );
};

export default LeadForm;
