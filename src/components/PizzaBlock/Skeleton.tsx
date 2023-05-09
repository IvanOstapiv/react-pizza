import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton: React.FC = () => (
  <ContentLoader
    speed={2}
    width={265}
    height={465}
    viewBox="0 0 265 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <circle cx="126" cy="129" r="121" />
    <rect x="0" y="314" rx="10" ry="10" width="280" height="90" />
    <rect x="11" y="432" rx="10" ry="10" width="100" height="27" />
    <rect x="135" y="428" rx="9" ry="9" width="120" height="40" />
    <rect x="2" y="267" rx="10" ry="10" width="260" height="30" />
  </ContentLoader>
);

export default Skeleton;
