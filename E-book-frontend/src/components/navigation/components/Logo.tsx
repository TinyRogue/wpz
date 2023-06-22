import { Link } from 'react-router-dom';
import logo from '../../../assets/images/logo.jpeg';
import { routes } from '../../../static/routes';

interface LogoProps {
  hideText?: boolean;
  size?: number;
}

export const Logo = (props: LogoProps) => {
  return (
    <Link to={routes.home}>
      <div className="flex items-center gap-2">
        <img src={logo} alt="logo" width={props.size ?? 120} height={props.size ?? 120} />
        {!props.hideText && <h1 className="text-2xl font-bold">Native book</h1>}
      </div>
    </Link>
  );
};
