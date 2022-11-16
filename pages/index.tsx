import { useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [title, setTitle] = useState('');

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleClick = async () => {
    const res = await fetch(`/api/og?title=${title}`);
    const blob = await res.blob();
    const dataUrl = URL.createObjectURL(blob);
    setPreviewUrl(dataUrl);
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
        <p>title</p>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className={styles.buttonWrapper}>
        <button onClick={handleClick}>preview</button>
      </div>
      {previewUrl && (
        <div className={styles.preview}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={previewUrl} alt="preview image" />
        </div>
      )}
    </div>
  );
}
