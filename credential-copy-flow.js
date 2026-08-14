/*
 * Credential copy flow
 * Preserve natural Japanese phrases and fit the user-designated credential lines.
 */
(function () {
  'use strict';

  var entries = [
    {
      match: '中学・高校の教員免許',
      groups: ['中学・高校の教員免許', '（社会・地理歴史・公民）']
    },
    {
      match: '英検準1級取得',
      groups: ['英検準1級取得']
    },
    {
      match: '漢検2級取得',
      groups: ['漢検2級取得']
    },
    {
      match: '塾講師（個別・集団）',
      groups: ['塾講師（個別・集団を合わせて）', '20年超の指導経験']
    },
    {
      match: '家庭教師（対面型）',
      groups: ['家庭教師（対面型）13年', '家庭教師（オンライン型）6年'],
      stacked: true
    },
    {
      match: '通信制高校のサポート校',
      groups: [
        '通信制高校のサポート校 現役講師',
        '（不登校・通信制高校から',
        '大学受験を目指す指導）'
      ],
      stacked: true
    },
    {
      match: '大学受験・英検対策',
      groups: ['大学受験・英検対策のプロ家庭教師', '（個人契約・センター紹介）']
    }
  ];

  function createPhrase(text) {
    var phrase = document.createElement('span');
    phrase.className = 'ks-credential-phrase';
    phrase.textContent = text;
    return phrase;
  }

  function buildCopy(entry) {
    var content = document.createElement('span');
    content.className = 'ks-credential-copy' + (entry.stacked ? ' ks-credential-copy--stacked' : '');

    entry.groups.forEach(function (group, index) {
      if (entry.stacked) {
        var line = document.createElement('span');
        line.className = 'ks-credential-line';
        line.appendChild(createPhrase(group));
        content.appendChild(line);
      } else {
        if (index > 0) content.appendChild(document.createTextNode(' '));
        content.appendChild(createPhrase(group));
      }
    });
    return content;
  }

  function enhanceCredentials() {
    var heading = Array.prototype.find.call(
      document.querySelectorAll('h1, h2, h3, h4, h5, h6'),
      function (element) {
        return element.textContent.replace(/\s+/g, '').trim() === '資格・経歴';
      }
    );

    var card = heading && heading.closest('.ks-teacher-credentials-card');
    if (!card) return;

    var list = card.querySelector('ul');
    if (!list) return;

    if (card.dataset.ksCredentialFlow !== 'true') {
      Array.prototype.slice.call(list.querySelectorAll(':scope > li')).forEach(function (item) {
        var entry = entries.find(function (candidate) {
          return item.textContent.indexOf(candidate.match) !== -1;
        });
        if (!entry) return;

        var check = item.querySelector('span');
        if (!check) return;

        Array.prototype.slice.call(item.childNodes).forEach(function (node) {
          if (node !== check) node.remove();
        });
        item.appendChild(buildCopy(entry));
      });

      card.classList.add('ks-credential-copy-flow');
      card.dataset.ksCredentialFlow = 'true';
    }

  }

  var resizeTimer;
  function scheduleCredentials() {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(enhanceCredentials, 80);
  }

  function start() {
    enhanceCredentials();
    [80, 260, 700, 1400].forEach(function (delay) {
      window.setTimeout(enhanceCredentials, delay);
    });
    window.addEventListener('load', enhanceCredentials, { once: true });
    window.addEventListener('resize', scheduleCredentials, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
}());
