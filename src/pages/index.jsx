import React from 'react';

import MainLayout from 'layouts/main';
import ConfigureFeatures from 'components/pages/home/configure-features/configure-features';
import FeatureFlags from 'components/pages/home/feature-flags/feature-flags';
import GetStarted from 'components/pages/home/get-started/get-started';
import Hero from 'components/pages/home/hero/hero';
import Languages from 'components/pages/home/languages/languages';
import Options from 'components/pages/home/options/options';
import RemoteConfig from 'components/pages/home/remote-config/remote-config';
import Platform from 'components/pages/home/platform/platform';

const IndexPage = () => (
  <MainLayout>
    <Hero />
    <FeatureFlags />
    <ConfigureFeatures />
    <RemoteConfig />
    <Platform />
    <Languages />
    <Options />
    <GetStarted />
  </MainLayout>
);

export default IndexPage;
