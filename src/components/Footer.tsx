import { motion } from 'framer-motion';
import { contactInfo, slogan } from '../data/brandData';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contacts" className="bg-black text-white py-12 lg:py-16">
      <div className="container-custom">
        <div className="text-center mb-12">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-display text-marmelat-pink mb-6"
          >
            {slogan}
          </motion.h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="text-lg font-semibold mb-4 text-marmelat-pink">MARMELAT</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Казахстанский бренд культовых средств для укладки волос
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Контакты</h4>
            <div className="space-y-2 text-gray-400 text-sm">
              <p>{contactInfo.address}</p>
              {contactInfo.phones.map((phone, index) => (
                <p key={index}>
                  <a
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="hover:text-marmelat-pink transition-colors"
                  >
                    {phone}
                  </a>
                </p>
              ))}
              <p>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="hover:text-marmelat-pink transition-colors"
                >
                  {contactInfo.email}
                </a>
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Социальные сети</h4>
            <motion.a
              href={`https://instagram.com/${contactInfo.instagram.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 bg-marmelat-pink text-white px-6 py-3 rounded-full hover:bg-marmelat-dark-pink transition-colors"
            >
              <span className="text-xl">📸</span>
              <span className="font-medium">{contactInfo.instagram}</span>
            </motion.a>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">WhatsApp</h4>
            <motion.a
              href={`https://wa.me/${contactInfo.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full hover:bg-[#20BA5A] transition-colors"
            >
              <span className="text-xl">💬</span>
              <span className="font-medium">Написать</span>
            </motion.a>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} MARMELAT. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};
