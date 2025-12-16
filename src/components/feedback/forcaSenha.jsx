import React from 'react';

export const getSenhaStrength = (senha) => {
  const checks = [
    (pw) => pw.length >= 8,
    (pw) => /[A-Z]/.test(pw),
    (pw) => /[a-z]/.test(pw),
    (pw) => /\d/.test(pw),
    (pw) => /[\W_]/.test(pw),
  ];

  const score = checks.reduce((acc, check) => acc + (check(senha) ? 1 : 0), 0);

  if (score <= 2) return 'Fraca';
  if (score === 3) return 'Média';
  if (score === 4) return 'Forte';
  return 'Muito Forte';
};

const strengthColorMap = {
  Fraca: '#e74c3c',
  Média: '#e67e22',
  Forte: '#2980b9',
  'Muito Forte': '#27ae60',
};

const strengthWidthMap = {
  Fraca: '25%',
  Média: '50%',
  Forte: '75%',
  'Muito Forte': '100%',
};

export const PasswordStrengthMeter = ({ senha }) => {
  const strength = getSenhaStrength(senha);

  if (!senha) return null;

  return (
    <div style={{ maxWidth: 900, marginTop: 8 }}>
      <div
        aria-label={`Força da senha: ${strength}`}
        role="progressbar"
        aria-valuenow={Object.keys(strengthColorMap).indexOf(strength) + 1}
        aria-valuemin={1}
        aria-valuemax={4}
        style={{
          height: 8,
          borderRadius: 4,
          backgroundColor: '#eee',
          overflow: 'hidden',
          marginBottom: 8,
        }}
      >
        <div
          style={{
            width: strengthWidthMap[strength],
            backgroundColor: strengthColorMap[strength],
            height: '100%',
            transition: 'width 0.3s ease',
          }}
        />
      </div>
      <p style={{ color: strengthColorMap[strength], fontWeight: 10, margin: 0 }}>
        Força da senha: {strength}
      </p>
    </div>
  );
};