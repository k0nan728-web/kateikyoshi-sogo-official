/*
 * Course recommendation list
 * Present the intended audience for every course as a readable, vertically stacked bullet list.
 */
(function () {
  'use strict';

  var recommendations = {
    '英検対策コース': [
      '英検に初挑戦される方',
      '何度受けても合格できない方',
      '短期集中で合格を目指す方',
      '英語が全くできない状態から合格を目指す方'
    ],
    '大学受験対策コース': [
      '志望校合格に向けて受験戦略を整えたい方',
      '英語・国語・社会をバランスよく強化したい方',
      '難関大学や逆転合格を目指す方',
      '一人で学習計画を立てにくい方'
    ],
    '不登校支援コース': [
      '学校に行けていない方',
      '学校復帰を目指しながら学習を進めたい方',
      '心理的ハードルが高く、学習再開に不安がある方',
      '小さな成功体験から自己肯定感を回復させたい方'
    ],
    '通信制高校 卒業・進学サポートコース': [
      '通信制高校の課題や単位取得を進めたい方',
      '高卒資格と大学受験を両立したい方',
      '学習計画や進路を一緒に整理したい方',
      '不登校から次の進路を目指したい方'
    ],
    '発達特性サポートコース': [
      'ASD・ADHDなどの特性に合わせて学びたい方',
      '集中しやすい授業の進め方を見つけたい方',
      '得意・苦手に合わせて教材を選びたい方',
      '無理のないペースで成功体験を重ねたい方'
    ],
    '総合型選抜・推薦対策コース': [
      '志望理由書や小論文を丁寧に仕上げたい方',
      '面接で自分の強みを伝えられるようになりたい方',
      '評定・活動実績を出願戦略につなげたい方',
      '推薦入試を見据えて早めに準備したい方'
    ],
    '高卒認定試験対策コース': [
      '高卒認定試験の合格を目指す方',
      '基礎から効率よく学び直したい方',
      '高卒資格から大学進学につなげたい方',
      '試験日までの学習計画を立てたい方'
    ],
    '高校受験対策コース': [
      '志望校に合わせて受験勉強を進めたい方',
      '内申点と入試対策を両立したい方',
      '英語・国語・社会を重点的に伸ばしたい方',
      '苦手科目を基礎から立て直したい方'
    ],
    '中学受験対策コース': [
      '英語・国語・社会を中心に中学受験へ備えたい方',
      '志望校に合わせた学習計画を作りたい方',
      '塾の学習を個別に補強したい方',
      '文章読解や記述の力を伸ばしたい方'
    ],
    '定期テスト・内申対策コース': [
      '定期テストの点数を上げたい方',
      '提出物や内申点を計画的に整えたい方',
      '学校別の授業進度に合わせて復習したい方',
      '高校受験に向けて成績を安定させたい方'
    ],
    '学校補習コース': [
      '学校の授業についていけるようになりたい方',
      'わからない部分をその週のうちに解決したい方',
      '宿題や提出物を一緒に進めたい方',
      '苦手をためずに基礎を固めたい方'
    ],
    'さかのぼり学習コース': [
      '前の学年の内容から学び直したい方',
      '基礎の抜けを一つずつ埋めたい方',
      '勉強に苦手意識があり、どこから始めるか迷う方',
      '受験や英検に向けて土台を作りたい方'
    ],
    '中高一貫校サポートコース': [
      '中高一貫校の速い進度に合わせたい方',
      '内部進学と大学受験を見据えて学びたい方',
      '学校独自の教材や課題を整理したい方',
      '英語・国語・社会を計画的に伸ばしたい方'
    ],
    '学習相談・保護者カウンセリングコース': [
      '今の学習状況と課題を整理したい方',
      'お子様に合う勉強法やコースを相談したい方',
      '進路や不登校への対応を一緒に考えたい方',
      '保護者様だけでまず相談したい方'
    ],
    '短期集中・試験直前対策コース': [
      '試験が近い方',
      '短期間で成果を出したい方',
      '最後の追い込みをしたい方',
      '他の指導との組み合わせで集中対策をしたい方'
    ]
  };

  function selectedCourseName(section) {
    var active = section.querySelector('button.shadow-md');
    return active ? active.textContent.replace(/\s+/g, ' ') : '';
  }

  function itemsFor(section, fallbackText) {
    var activeName = selectedCourseName(section);
    var key = Object.keys(recommendations).find(function (course) {
      return activeName.indexOf(course) !== -1;
    });
    if (key) return recommendations[key];
    return fallbackText.replace(/\s+/g, ' ').split('・').map(function (item) {
      return item.trim();
    }).filter(Boolean);
  }

  function fillList(list, items) {
    list.replaceChildren();
    items.forEach(function (item) {
      var row = document.createElement('li');
      row.textContent = item;
      list.appendChild(row);
    });
  }

  function recommendationBox(section) {
    var label = Array.prototype.find.call(section.querySelectorAll('p'), function (paragraph) {
      return paragraph.textContent.trim() === 'こんな方におすすめ';
    });
    return label ? label.parentElement : null;
  }

  function enhanceRecommendations() {
    var section = document.getElementById('courses');
    if (!section) return;
    var box = recommendationBox(section);
    if (!box) return;

    var paragraph = box.querySelector('p.ks-course-copy-flow');
    var list = box.querySelector('.ks-course-recommendation-list');
    var fallback = paragraph ? paragraph.textContent.trim() : (list ? list.textContent.trim() : '');
    var items = itemsFor(section, fallback);
    if (!items.length) return;

    if (!list) {
      list = document.createElement('ul');
      list.className = 'ks-course-recommendation-list';
      if (paragraph) paragraph.replaceWith(list);
      else box.appendChild(list);
    } else if (paragraph) {
      /* React may retain a fresh source paragraph beside the previously injected list. */
      paragraph.remove();
    }

    var currentItems = Array.prototype.map.call(list.querySelectorAll('li'), function (row) {
      return row.textContent.trim();
    });
    if (currentItems.join('\u0000') !== items.join('\u0000')) fillList(list, items);
    box.classList.add('ks-course-recommendation-box');
  }

  function start() {
    enhanceRecommendations();
    [80, 260, 700, 1400].forEach(function (delay) {
      window.setTimeout(enhanceRecommendations, delay);
    });
    var section = document.getElementById('courses');
    if (!section) return;
    Array.prototype.forEach.call(section.querySelectorAll('button'), function (button) {
      button.addEventListener('click', function () {
        [80, 260, 600].forEach(function (delay) {
          window.setTimeout(enhanceRecommendations, delay);
        });
      });
    });
    new MutationObserver(function () {
      window.setTimeout(enhanceRecommendations, 80);
    }).observe(section, { childList: true, subtree: true });

    /* The course detail is rendered by a bundled React component. A lightweight guard
       keeps the injected list synchronized even when that component reuses its card DOM. */
    window.setInterval(enhanceRecommendations, 500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
}());
