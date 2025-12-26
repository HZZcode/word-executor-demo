// import React from 'react';
import Chat, { Bubble, TypingBubble, useMessages } from '@chatui/core';
import '@chatui/core/dist/index.css';

const mappings = [
  'kyakwvdrewrhvlexmpkuxbekhi',
  'csoamsprtqaqnxcfuyksbmgwic',
  'yqtbfmtolohnurblauiprcprwh',
  'vlmqhbsivhitgshfglzldsadri',
  'zooedeovctubizvknmoyawdmzk',
  'esthmzmcdtpnedgtwtfbefehsu',
  'xqptxccyrkzfvrenfyholsexfs'
]

/** @param {string} word */
function executeWord(word) {
  const match = (x, y) => x.replaceAll(/[^a-z]/g, '') === y.replaceAll(/[^a-z]/g, '');
  if (match(word, 'we lack published index explorer'))
    return 'This doesn\'t seem to be a meaningful phrase or sentence... Anyway, Congratulations on solving this puzzle!';
  if (match(word, 'world.execute(me)'))
    return 'Good guess! This is a correct intermediate answer!';
  if (match(word, 'ein dos trois ne fem liu execution'))
    return 'You\'ve found the lyrics needed to finally solve the puzzle!';
  if (match(word, 'ichikus'))
    return 'This is an easter egg!';
  if (!/^[a-z]+$/.test(word))
    return 'Oops! I don\'t understand this word. Try to use English only.';
  if (word.length > 7)
    return 'Sorry, but this word is too long for me. Let\'s talk about something shorter.';
  if (word.length < 7)
    return 'Sorry, but this word is too short for me. Let\'s talk about something longer.';
  const result = [...word].map((c, i) => mappings[i][c.charCodeAt(0) - 'a'.charCodeAt(0)]).join('')
  return `Execution result: ${result}. Have fun puzzling!`;
}

const initialMessages = [
  {
    type: 'image',
    content: { picUrl: 'ph.png' }
  },
  {
    type: 'text',
    content: { text: 'Hi, this is Ichiku. Send me a word and I\'ll execute it for you.' }
  }
];

export default function _() {
  const { messages, appendMsg } = useMessages(initialMessages);

  function handleSend(type, val) {
    if (type === 'text' && val.trim()) {
      appendMsg({
        type: 'text',
        content: { text: val },
        position: 'right',
      });

      setTimeout(() => {
        appendMsg({
          type: 'text',
          content: { text: executeWord(val.trim().toLowerCase()) },
        });
      }, 1000);
    }
  }

  function handleQuickReplyClick(item) {
    handleSend('text', item.name);
  }

  function renderMessageContent(msg) {
    const { type, content } = msg;
    if (type === 'text') {
      if (msg.position === 'right') return <Bubble content={content.text} />;
      else return <TypingBubble content={content.text} options={{ step: [1, 6], interval: 100 }} />
    }
    if (type === 'image') return (
      <Bubble type="image">
        <img src={content.picUrl} alt="" />
      </Bubble>
    );
    return null;
  }

  return (
    <Chat
      navbar={{ title: 'Word Executor' }}
      locale='en-US'
      messages={messages}
      renderMessageContent={renderMessageContent}
      onQuickReplyClick={handleQuickReplyClick}
      onSend={handleSend}
    />
  );
}