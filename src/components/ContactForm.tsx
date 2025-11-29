import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';

interface FormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', phone: '', email: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-xl p-8"
    >
      <h3 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-6">
        Свяжитесь с нами
      </h3>

      {isSubmitted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-marmelat-pale-pink border border-marmelat-pink text-gray-800 p-4 rounded-lg mb-6"
        >
          Спасибо за обращение! Мы свяжемся с вами в ближайшее время.
        </motion.div>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            Имя
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-marmelat-pink focus:outline-none focus:ring-2 focus:ring-marmelat-pink/20 transition-colors"
            placeholder="Ваше имя"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
            Телефон
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-marmelat-pink focus:outline-none focus:ring-2 focus:ring-marmelat-pink/20 transition-colors"
            placeholder="+7 (___) ___-__-__"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-marmelat-pink focus:outline-none focus:ring-2 focus:ring-marmelat-pink/20 transition-colors"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
            Сообщение
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-marmelat-pink focus:outline-none focus:ring-2 focus:ring-marmelat-pink/20 transition-colors resize-none"
            placeholder="Ваше сообщение"
          />
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-marmelat-pink text-white py-4 rounded-lg font-semibold hover:bg-marmelat-light-pink transition-colors duration-300 shadow-lg hover:shadow-xl"
        >
          Отправить
        </motion.button>
      </div>
    </motion.form>
  );
};
