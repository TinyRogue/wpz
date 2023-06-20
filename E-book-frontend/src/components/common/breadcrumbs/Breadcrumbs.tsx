import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { routes } from '../../../static/routes';
import HomeIcon from '../../icons/HomeIcon';

const Breadcrumbs = () => {
  const location = useLocation();
  const { t } = useTranslation();

  const pathSegments = location.pathname.split('/').filter(segment => segment !== '');

  const breadcrumbs = pathSegments.map((segment, index) => {
    const path = `/${pathSegments.slice(0, index + 1).join('/')}`;

    return (
      <div key={index} className="flex items-center ml-3">
        <ChevronRightIcon height={16} />
        <Link to={path} className="ml-3 text-sm">
          {t(`navigation.${segment}`)}
        </Link>
      </div>
    );
  });

  return (
    <div className="flex">
      <Link to={routes.home}>
        <div className="flex gap-1.5 items-center">
          <HomeIcon small />
          <p className="text-sm">{t('navigation.home')}</p>
        </div>
      </Link>
      {breadcrumbs}
    </div>
  );
};

export default Breadcrumbs;
