/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { GTAOSPhoneFrame } from './os/components/GTAOSPhoneFrame';
import { AppRouter } from './os/navigation/AppRouter';

export default function App() {
  return (
    <GTAOSPhoneFrame>
      <AppRouter />
    </GTAOSPhoneFrame>
  );
}
