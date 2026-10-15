'use client';

import { Zap } from 'lucide-react';
import { TwitterIcon, GithubIcon, LinkedinIcon } from './BrandIcons';
import { useLang } from '@/context/LangContext';

export default function Footer() {
  const { t } = useLang();

  return (
    <footer id="hakkinda" className="border-t border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo + tagline */}
        <div>
          <div className="flex items-center gap-2 font-display font-bold text-lg mb-4">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center">
              <Zap size={14} className="text-white" />
            </span>
            <span className="gradient-text">AI Compare</span>
          </div>
          <p className="text-sm text-gray-500">{t('footer.tagline')}</p>
        </div>

        {/* Keşfet */}
        <div>
          <h4 className="font-semibold mb-3 text-sm text-white">
            {t('footer.explore')}
          </h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li>
              <a href="#kesfet" className="footer-link">
                {t('footer.popular')}
              </a>
            </li>
            <li>
              <a href="#kategoriler" className="footer-link">
                {t('footer.categories')}
              </a>
            </li>
            <li>
              <a href="#liderler" className="footer-link">
                {t('footer.leaders')}
              </a>
            </li>
          </ul>
        </div>

        {/* Şirket */}
        <div>
          <h4 className="font-semibold mb-3 text-sm text-white">
            {t('footer.company')}
          </h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li>
              <a href="#" className="footer-link">
                {t('footer.aboutus')}
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                {t('footer.contact')}
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                {t('footer.privacy')}
              </a>
            </li>
          </ul>
        </div>

        {/* Sosyal */}
        <div>
          <h4 className="font-semibold mb-3 text-sm text-white">
            {t('footer.follow')}
          </h4>
          <div className="flex gap-3">
            <a href="#" className="social-btn" aria-label="Twitter">
              <TwitterIcon size={16} />
            </a>
            <a href="#" className="social-btn" aria-label="GitHub">
              <GithubIcon size={16} />
            </a>
            <a href="#" className="social-btn" aria-label="LinkedIn">
              <LinkedinIcon size={16} />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/5 text-center text-xs text-gray-600">
        {t('footer.rights')}
      </div>
    </footer>
  );
}