

Next.jsでは、通常のHTMLファイルを直接ホストする方法は一般的ではありません。代わりに、Next.jsのページとしてJavaScript/TypeScriptファイルを作成し、必要なコンテンツを組み込みます。これにより、Next.jsのルーティングやその他の機能をフルに活用できます。

また、AJAXリクエストに対応するバックエンドを作成するためには、Next.jsのAPIルートを使用することができます。

以下は、あなたのindex.htmlの内容をNext.jsプロジェクト内に組み込む方法です。

`app/page.tsx` はindex.tsxと競合するので捨てる

http://localhost:3000/

1. **Next.jsプロジェクト内にページを作成する**:
   `pages/index.tsx` を作成し、以下の内容を追加します。

```typescript
import { useState } from 'react';

const Home = () => {
  const [number, setNumber] = useState<number | undefined>(undefined);
  const [result, setResult] = useState<string>('');

  const checkNumber = async () => {
    if (number !== undefined) {
      const response = await fetch('/api/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ value: number })
      });
      const data = await response.json();
      setResult(`Lucas Number: ${data.result}, Calculation Time: ${data.duration.toFixed(6)} seconds`);
    }
  };

  return (
    <div>
      <h1>Lucas Number</h1>
      <input 
        type="number" 
        value={number !== undefined ? number : ''} 
        onChange={(e) => setNumber(parseInt(e.target.value))}
        placeholder="Enter a number" 
      />
      <button onClick={checkNumber}>Check</button>
      <p id="result">{result}</p>
    </div>
  );
};

export default Home;
```

2. **APIルートを作成する**:
   `pages/api/check.ts` を作成し、以下の内容を追加します。

```typescript
import { NextApiRequest, NextApiResponse } from 'next';

// Lucas数を計算する関数
const calculateLucasNumber = (n: number): number => {
  if (n === 0) return 2;
  if (n === 1) return 1;
  let a = 2, b = 1, c = 0;
  for (let i = 2; i <= n; i++) {
    c = a + b;
    a = b;
    b = c;
  }
  return c;
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  const start = process.hrtime();
  const { value } = req.body;
  const result = calculateLucasNumber(value);
  const end = process.hrtime(start);
  const duration = end[0] + end[1] / 1e9; // seconds
  res.status(200).json({ result, duration });
};
```

これで、Next.jsプロジェクト内にLucas数を計算するためのインターフェースとバックエンドが用意されました。

### 手順の概要
1. `index.html`の内容を`pages/index.tsx`に変換。
2. `pages/api/check.ts`を作成し、AJAXリクエストに対応するAPIエンドポイントを定義。

これにより、Next.jsを使用して完全なフロントエンドとバックエンドを構築し、Lucas数を計算することができます。

```
cd vercel_lucas

git init
git remote add origin https://github.com/tztechno/vercel_lucas2
git add .
git commit -m "Session Results"
git push -u origin main

git push -f origin main　強制

https://tztechno.github.io/vercel_lucas2/

```