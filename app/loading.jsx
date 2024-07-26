import Image from 'next/image';

export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Image 
        src="/loading.gif" 
        alt="Loading..." 
        width={160} 
        height={160} 
        className="h-auto w-auto"
      />
    </div>
  );
}