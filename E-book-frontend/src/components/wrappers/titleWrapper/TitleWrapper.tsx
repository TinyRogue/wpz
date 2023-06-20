import React from 'react';
import Breadcrumbs from '../../common/breadcrumbs/Breadcrumbs';
import SectionWrapper from '../sectionWrappers/SectionWrapper';

type TileWrapperProps = {
  title: string;
  children: React.ReactNode;
  sideComponent?: React.ReactElement;
};

const TitleWrapper = ({ title, children, sideComponent }: TileWrapperProps) => {
  return (
    <SectionWrapper>
      <div className="flex flex-col w-full">
        <div className="flex justify-between mb-7">
          <div className="flex flex-col">
            <h1 className="text-black700 mb-6">{title}</h1>
            <Breadcrumbs />
          </div>

          <div className="flex gap-6">{sideComponent}</div>
        </div>
        <article>{children}</article>
      </div>
    </SectionWrapper>
  );
};

export default TitleWrapper;
