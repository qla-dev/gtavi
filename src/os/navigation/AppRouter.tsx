import React from 'react';
import { useOSStore } from '../../store/useOSStore';
import { Launcher } from '../launcher/Launcher';
import { LockScreen } from '../launcher/LockScreen';
import { LeonidaMapsApp } from '../../apps/maps/LeonidaMapsApp';
import { GarageApp } from '../../apps/garage/GarageApp';
import { SnapmaticApp } from '../../apps/snapmatic/SnapmaticApp';
import { SocialApp } from '../../apps/social/SocialApp';
import { PropertiesApp } from '../../apps/properties/PropertiesApp';
import { ChecklistApp } from '../../apps/checklist/ChecklistApp';
import { ContactsApp } from '../../apps/contacts/ContactsApp';
import { NewsApp } from '../../apps/news/NewsApp';
import { AICopilotApp } from '../../apps/ai/AICopilotApp';
import { SettingsApp } from '../../apps/settings/SettingsApp';

export const AppRouter: React.FC = () => {
  const activeApp = useOSStore((s) => s.activeApp);
  const isLocked = useOSStore((s) => s.isLocked);

  const renderActiveApp = () => {
    switch (activeApp) {
      case 'maps':
        return <LeonidaMapsApp />;
      case 'garage':
        return <GarageApp />;
      case 'snapmatic':
        return <SnapmaticApp />;
      case 'social':
        return <SocialApp />;
      case 'properties':
        return <PropertiesApp />;
      case 'checklist':
        return <ChecklistApp />;
      case 'contacts':
        return <ContactsApp />;
      case 'news':
        return <NewsApp />;
      case 'ai':
        return <AICopilotApp />;
      case 'settings':
        return <SettingsApp />;
      default:
        return <Launcher />;
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Active Application / Launcher */}
      <div className="w-full h-full animate-in fade-in zoom-in-95 duration-200">
        {renderActiveApp()}
      </div>

      {/* Lockscreen layer */}
      {isLocked && <LockScreen />}
    </div>
  );
};
