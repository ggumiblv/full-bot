import { useCallback, useEffect, useState } from 'react';
import { useTelegram } from '../../hooks/useTelegram';

import './index.css';

const subjects = [
  { value: 'physical', label: 'Физ. лицо' },
  { value: 'legal', label: 'Юр. лиц' }
];

function getInitialData() {
  return { country: '', street: '', subject: subjects[0].value };
}

function Form() {
  const [form, setForm] = useState(getInitialData());

  const { tg } = useTelegram();

  const onSendData = useCallback(() => {
    tg.sendData(JSON.stringify(form));
  }, [form.country, form.street, form.subject]);

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData);
    return () => {
      tg.offEvent('mainButtonClicked', onSendData);
    };
  }, [onSendData]);

  useEffect(() => {
    tg.MainButton.setParams({
      text: 'Отправить данные'
    });
  }, []);

  useEffect(() => {
    if (!form.street || !form.country) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [form]);

  const onChange = (key) => {
    return (e) => {
      setForm((oldForm) => ({ ...oldForm, [key]: e.target.value }));
    };
  };

  return (
    <div className={'form'}>
      <h3>Введите ваши данные</h3>
      <input
        className={'input'}
        type="text"
        placeholder={'Страна'}
        value={form.country}
        onChange={onChange('country')}
      />
      <input
        className={'input'}
        type="text"
        placeholder={'Улица'}
        value={form.street}
        onChange={onChange('street')}
      />
      <select value={form.subject} onChange={onChange('subject')} className={'select'}>
        {subjects.map((subject) => (
          <option key={subject.value} value={subject.value}>
            {subject.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Form;
