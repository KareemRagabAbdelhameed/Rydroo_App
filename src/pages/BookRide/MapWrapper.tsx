// src/components/MapWrapper.tsx
import React from 'react';

const MapWrapper: React.FC = () => {

  return (
    <div className="w-full h-96 mb-8 rounded-lg shadow-lg overflow-hidden">
      <iframe className='border-0 w-full' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d130421.11248996595!2d31.353182309023854!3d30.06791906419576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fa60b21beeb%3A0x79dfb296e8423bba!2z2KfZhNmC2KfZh9ix2KnYjCDZhdit2KfZgdi42Kkg2KfZhNmC2KfZh9ix2KnigKw!5e1!3m2!1sar!2seg!4v1760298344711!5m2!1sar!2seg" width="600" height="450" loading="lazy"></iframe>
    </div>
  );
}
export default MapWrapper;