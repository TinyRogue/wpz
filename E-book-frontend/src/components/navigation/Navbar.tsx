import { signOut } from 'firebase/auth';
import { useTranslation } from 'react-i18next';
import { firebaseAuth } from '../../api/firebase/firebase';
import { routes } from '../../static/routes';
import ArrowLeft from '../icons/ArrowLeft';
import HomeIcon from '../icons/HomeIcon';
import { Logo } from './components/Logo';
import NavButton from './components/NavButton';

export const Navbar = () => {
  const { t } = useTranslation();

  return (
    <nav className="fixed top-0 left-0 z-10 flex flex-col justify-between h-screen pb-12 bg-white700">
      <div>
        <div className="pt-[3.75rem] flex justify-center pb-8 cursor-pointer">
          <Logo size={80} />
        </div>
        <div>
          <NavButton href={routes.home} text={t('navigation.home')} icon={<HomeIcon />} />
        </div>
        <div>
          <NavButton href={routes.phrases} text={t('navigation.phrases')} icon={<HomeIcon />} />
        </div>
        <div>
          <NavButton href={routes.addBook} text={t('navigation.addBook')} icon={<HomeIcon />} />
        </div>
      </div>
      <div>
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
    </nav>
  );
};
