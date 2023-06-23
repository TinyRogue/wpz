import { signOut } from 'firebase/auth';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';
import { firebaseAuth } from '../../api/firebase/firebase';
import { routes } from '../../static/routes';
import ArrowLeft from '../icons/ArrowLeft';
import HamburgerOpen from '../icons/HamburgerOpen';
import HomeIcon from '../icons/HomeIcon';
import XMarkIcon from '../icons/XmarkIcon';
import { Logo } from './components/Logo';
import NavButton from './components/NavButton';

//TODO: placeholder component - update when needed
export const NavbarMobile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <nav
      className={twMerge(
        `fixed top-0 left-0 z-50 flex flex-col gap-16 w-full ${isOpen ? 'h-screen' : 'h-20'} bg-white700`,
      )}
    >
      <div className="flex items-center justify-between h-20 px-10 bg-white700">
        {isOpen ? (
          <div onClick={() => setIsOpen(false)} className="w-6 cursor-pointer">
            <XMarkIcon />
          </div>
        ) : (
          <div onClick={() => setIsOpen(true)} className="w-6 cursor-pointer">
            <HamburgerOpen />
          </div>
        )}
        <Logo hideText size={60} />
      </div>
      {isOpen && (
        <div className="flex flex-col gap-12">
          <div className="mx-4 rounded-md bg-white700">
            <NavButton
              href={routes.home}
              text={t('navigation.home')}
              icon={<HomeIcon />}
              buttonProps={{
                onClick: () => setIsOpen(false),
              }}
            />
            <NavButton
              href={routes.phrases}
              text={t('navigation.phrases')}
              icon={<HomeIcon />}
              buttonProps={{
                onClick: () => setIsOpen(false),
              }}
            />
            <NavButton
              href={routes.addBook}
              text={t('navigation.addBook')}
              icon={<HomeIcon />}
              buttonProps={{
                onClick: () => setIsOpen(false),
              }}
            />
          </div>
          <div className="mx-4 rounded-md bg-white700">
            <NavButton
              href={routes.login}
              text={t('navigation.logout')}
              buttonProps={{
                onClick: () => {
                  signOut(firebaseAuth);
                },
              }}
              icon={<ArrowLeft color="grey" />}
            />
          </div>
        </div>
      )}
    </nav>
  );
};
