import { motion, AnimatePresence } from 'framer-motion';
import { Mail, X } from 'lucide-react';
import clsx from 'clsx';

const ForgotPasswordModal = ({ isOpen, onClose, isDarkMode }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password reset logic here
    console.log('Password reset requested');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[201] w-[90%] max-w-md"
          >
            <div
              className={clsx(
                'relative rounded-3xl p-6 sm:p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] backdrop-blur-xl border',
                isDarkMode
                  ? 'bg-black/30 border-white/10'
                  : 'bg-white/30 border-white/40'
              )}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className={clsx(
                  'absolute top-4 left-4 p-2 rounded-full transition-all duration-300 hover:scale-110',
                  isDarkMode
                    ? 'bg-white/10 hover:bg-white/20 text-white'
                    : 'bg-white/50 hover:bg-white/70 text-gray-800'
                )}
              >
                <X size={20} />
              </button>

              {/* Content */}
              <div className="text-center mt-8">
                <h2
                  className={clsx(
                    'text-2xl sm:text-3xl font-bold mb-3 tracking-tight',
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  )}
                >
                  Forgot Password
                </h2>
                <p
                  className={clsx(
                    'text-xs sm:text-sm mb-6 leading-relaxed px-2',
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  )}
                >
                  {/* Mobile version - shorter text */}
                  <span className="block sm:hidden">
                    Enter your email address to receive a reset link.
                  </span>
                  {/* Desktop version - full text */}
                  <span className="hidden sm:block">
                    Enter your email address to receive a reset link and
                    <br />
                    regain access to your account.
                  </span>
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Input */}
                  <div className="relative w-full">
                    <div
                      className={clsx(
                        'absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none transition-colors duration-300',
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      )}
                    >
                      <Mail size={16} className="sm:w-[18px] sm:h-[18px]" />
                    </div>
                    <input
                      type="email"
                      placeholder="Email address"
                      required
                      autoComplete="email"
                      className={clsx(
                        'w-full rounded-full py-2.5 sm:py-3.5 pl-10 sm:pl-12 pr-3 sm:pr-4 text-xs sm:text-sm transition-all duration-300 outline-none backdrop-blur-md',
                        isDarkMode
                          ? 'bg-white/10 border-2 border-white/20 text-white placeholder-gray-500 focus:border-celadon-500/70 focus:bg-white/15 shadow-[0_8px_32px_0_rgba(255,255,255,0.05)]'
                          : 'bg-white/50 border-2 border-white/60 text-gray-900 placeholder-gray-400 focus:border-celadon-600 focus:bg-white/70 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]'
                      )}
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-turf-green-600 to-celadon-600 text-white font-semibold py-2.5 sm:py-3.5 rounded-full text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Continue
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ForgotPasswordModal;
