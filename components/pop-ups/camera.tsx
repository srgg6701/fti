'use client';
import Image from 'next/image';
import { ButtonRoundedGrey } from '@/components/button-rounded';

// 1) ДОБАВИЛ импорт прогресса
import DottedCircularProgress from '@/components/DottedCircularProgress';

export default function Camera({ imgSrc, onClose }: { imgSrc: string; onClose: () => void }) {
  return (
    <div className="camera-overlay fixed inset-0 z-50 flex items-center justify-center">
      {/* 3) Поднял кнопку выше прогресса: zIndex: 3 */}
      <ButtonRoundedGrey
        btnText="Back"
        style={{ position: 'absolute', top: '40px', right: '60px', zIndex: 3, width: '79px' }}
        onPress={onClose}
      />

      {/* 2) ВСТАВИЛ прогресс над маской и под кнопкой */}
      <div className="camera-progress">
        {/* size здесь не важен — его перекрывает CSS (100% контейнера) */}
        <DottedCircularProgress
          size={100} // не важно: CSS делает 100%
          ring={4}
          color="#3B57FF"
          dot={0.028}
          gap={0.072}
          startDeg={-90}
          animate
          duration={2500}
        />
      </div>

      {/* картинка под маской */}
      <div className="camera-image absolute inset-0 flex bg-black">
        <Image alt="Client image" className="m-auto" height={752} src={imgSrc} width={1029} />
      </div>

      <div className="text-semibold absolute bottom-[65px] z-51 text-[18px]">
        Turn your head to the left...
      </div>
    </div>
  );
}
