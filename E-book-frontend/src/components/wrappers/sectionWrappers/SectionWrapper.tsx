interface SectionWrapperProps {
  children: React.ReactNode;
}

const SectionWrapper = ({ children }: SectionWrapperProps) => {
  return <div className="w-full pt-[4.375rem] px-4 lg:px-8 xl:px-14 flex flex-col justify-center">{children}</div>;
};

export default SectionWrapper;
