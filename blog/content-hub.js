(() => {
  const LEGACY_BLOG_URL = "https://eiken-seminar.hatenablog.jp/";
  const CONTACT_URL = "https://kateikyoshi-sogo.com/#contact";

  // 公式アカウントを公開する際は、該当する url に公式URLを設定してください。
  // 空のアカウントはサイト上に表示されません。
  const SOCIAL_PROFILES = [
    { name: "LINE公式", label: "LINE", url: "", tone: "line" },
    { name: "X", label: "X", url: "", tone: "x" },
    { name: "Instagram", label: "IG", url: "", tone: "instagram" },
    { name: "YouTube", label: "YT", url: "", tone: "youtube" },
  ];

  const ARTICLES = [
{
  "slug": "kateikyoshi-or-cram-school",
  "category": "塾・家庭教師の選び方",
  "date": "2026-11-07",
  "displayDate": "2026.11.07",
  "readingTime": "6分で読めます",
  "title": "家庭教師と塾はどちらがいい？子どもに合う学び方を選ぶ7つの視点",
  "summary": "家庭教師・個別指導塾・集団塾には、それぞれ異なる良さがあります。授業形式だけで決めず、学習状況・性格・通塾負担・費用・質問のしやすさから、家庭に合う選び方を整理します。",
  "tags": [
    "家庭教師",
    "塾",
    "個別指導",
    "保護者向け"
  ],
  "intro": "「家庭教師と塾のどちらがよいのだろう」と迷ったとき、最初から一つに決める必要はありません。大切なのは、評判や形式だけで選ぶのではなく、お子様が今どこでつまずき、どのような環境なら学びやすいかを確認することです。ここでは、代表的な学習サービスの特徴と、比較するときの視点を紹介します。",
  "sections": [
    {
      "heading": "1. 集団塾は、競争や決まったペースを活用したい場合に",
      "body": [
        "集団塾は、同じ目標を持つ仲間と学び、決められたカリキュラムに沿って進められることが強みです。授業のペースに乗れるお子様や、周囲から刺激を受けることで意欲が高まるお子様には合いやすいでしょう。",
        "一方、授業中に質問するタイミングをつかみにくい、欠席した内容を補う必要がある、理解度にかかわらず授業が進むといった点は、事前に確認したいところです。補講や質問対応、自習室の利用条件も比較しましょう。"
      ]
    },
    {
      "heading": "2. 個別指導塾は、教室で対面しながら学びたい場合に",
      "body": [
        "個別指導塾は、教室に通いながら講師に質問できることや、自習スペースを使える場合があることが特徴です。家では集中しにくいお子様や、学習する場所と生活する場所を分けたいご家庭にも選択肢になります。",
        "ただし「個別」の人数や担当講師の決まり方は教室ごとに異なります。1対1なのか、複数の生徒を同時に見る形式なのか、毎回同じ講師か、授業外の質問や振替に対応するかを具体的に確認してください。"
      ]
    },
    {
      "heading": "3. 家庭教師は、本人の課題に合わせて進め方を調整しやすい",
      "body": [
        "家庭教師は、自宅などで講師と個別に学ぶ形式です。学校の進度に合わせる、苦手単元へ戻る、志望校の出題傾向に合わせるなど、本人の状況に応じて授業内容を調整しやすい点が特徴です。",
        "講師との相性や専門性が学習体験に影響するため、担当者の経歴、指導科目、授業準備、振り返り、料金の総額を確認しましょう。家庭教師センター経由と講師との直接契約でも、料金やサポート体制が異なります。"
      ]
    },
    {
      "heading": "4. オンライン家庭教師も、家庭教師の選択肢の一つ",
      "body": [
        "オンライン家庭教師は、ビデオ通話や共有画面などを使い、離れた場所から個別指導を受ける形式です。通塾や講師の訪問が不要で、地域に限らず講師を検討できることが利点です。",
        "一方、通信環境や端末の準備が必要で、画面越しのやり取りが合わないお子様もいます。対面で同じ空間にいる安心感を重視する場合は、訪問型や教室型のほうが合うこともあります。"
      ]
    },
    {
      "heading": "5. 迷ったら、次の7項目を同じ条件で比べる",
      "body": [
        "比較するときは、授業料だけでなく、教材費・入会金・管理費・交通費・季節講習・追加授業を含めた総額で考えます。また、担当講師が固定されるか、授業外の質問に対応するか、欠席時の振替条件、保護者への報告、契約期間や解約条件も確認しましょう。"
      ],
      "points": [
        "現在の学力や苦手に合わせて授業内容を調整できるか",
        "質問しやすく、分からないまま進みにくい仕組みか",
        "講師の専門性と担当継続性が明確か",
        "授業料以外の費用を含めた総額が分かるか",
        "通塾・送迎・通信環境などの負担が現実的か",
        "欠席・振替・退会の条件が事前に説明されているか",
        "保護者が進捗や課題を把握できるか"
      ]
    },
    {
      "heading": "6. 形式より先に、今の困りごとを言葉にする",
      "body": [
        "「授業についていけない」「質問できない」「家で勉強が始められない」「英検と受験を両立したい」など、困りごとによって合うサービスは変わります。複数のサービスで体験や相談ができる場合は、同じ質問をして説明の分かりやすさや相性を比べると判断しやすくなります。",
        "塾が合うお子様もいれば、家庭教師が合うお子様もいます。オンラインか対面かも含め、本人が無理なく続けられる方法を選ぶことが大切です。"
      ]
    }
  ],
  "closing": "学び方の選択肢を比較しても決めきれない場合は、現在の学習状況や目標を整理するところからご相談いただけます。鈴木雄太の指導は全国オンライン対応です。対面指導を提供しているわけではないため、オンラインの特徴と注意点も含めてご案内します。",
  "relatedLinks": [
    {
      "label": "料金・契約形態の比較ガイド",
      "url": "/hikaku/"
    },
    {
      "label": "公式サイトで指導内容・料金を見る",
      "url": "/#pricing"
    }
  ]
},
{
  "slug": "individual-tutoring-school-vs-home-tutor",
  "category": "塾・家庭教師の選び方",
  "date": "2026-11-07",
  "displayDate": "2026.11.07",
  "readingTime": "5分で読めます",
  "title": "個別指導塾と家庭教師の違いは？授業形式・講師・費用を比較",
  "summary": "どちらも一人ひとりに合わせた指導を掲げていますが、教室環境、担当講師、授業人数、費用の仕組みは異なります。契約前に確認したいポイントを分かりやすく解説します。",
  "tags": [
    "個別指導塾",
    "家庭教師",
    "料金比較",
    "講師選び"
  ],
  "intro": "個別指導塾と家庭教師は、どちらも個々の理解度に合わせて学べる選択肢です。ただし、教室に通うか、自宅などで授業を受けるかだけでなく、講師1人が担当する生徒数や担当の決まり方、授業外のサポートにも違いがあります。名称だけで判断せず、実際の運営方法を確認しましょう。",
  "sections": [
    {
      "heading": "1. 授業を受ける場所と学習環境",
      "body": [
        "個別指導塾は教室へ通うため、自宅では集中しにくい場合や、授業の前後に自習したい場合に便利です。教室の雰囲気や自習室の利用条件も、選ぶ理由になります。",
        "家庭教師は自宅などで授業を受けるため、移動時間や送迎の負担を抑えやすく、普段使っている教材や学校の課題を授業に取り入れやすい面があります。オンライン家庭教師なら講師の訪問も不要ですが、端末と通信環境が必要です。"
      ]
    },
    {
      "heading": "2. 「個別指導」の人数と講師の担当方法",
      "body": [
        "個別指導塾には、講師1人が生徒1人を担当する形式のほか、1人の講師が複数の生徒を順番に見る形式もあります。授業時間のうち、講師が直接説明・確認する時間がどれくらいあるかを聞いておきましょう。",
        "家庭教師は1対1が基本ですが、講師の専門分野や経験、毎回同じ講師が担当するかは契約によって異なります。担当交代の可能性や、相性が合わない場合の相談先も確認が必要です。"
      ]
    },
    {
      "heading": "3. 授業内容をどこまで個別に調整できるか",
      "body": [
        "学校の授業の予習・復習を中心にするのか、定期テスト対策、英検、大学受験など特定の目標へ向けるのかで、必要な指導設計は変わります。塾では教室のカリキュラムや教材が決まっている場合があり、家庭教師では本人の課題に合わせて柔軟に組み立てられる場合があります。",
        "ただし、家庭教師だから必ず専門性が高い、個別指導塾だから柔軟性が低いとは限りません。実際に担当する講師と、授業計画の作り方を確認してください。"
      ]
    },
    {
      "heading": "4. 費用は月謝だけでなく総額で比較する",
      "body": [
        "個別指導塾では、授業料のほかに入会金、教材費、施設関連費、季節講習費などがかかることがあります。家庭教師では、授業料、交通費、教材費、紹介・管理に関する費用など、契約形態によって項目が異なります。オンライン型では交通費が不要でも、端末や通信環境の準備が必要です。",
        "同じ月の授業回数・時間・科目数で見積もりを取り、通常月だけでなく講習月や追加授業の費用も確認しましょう。料金の比較では、月額表示だけでなく年間の想定総額を見ることが重要です。"
      ]
    },
    {
      "heading": "5. 契約前に確認したい質問",
      "body": [
        "体験授業では、教え方だけでなく、説明の分かりやすさ、本人の反応、質問への対応、授業後の振り返りも確認しましょう。保護者への報告頻度や、授業外の相談範囲を聞いておくと、入会後の認識違いを減らせます。"
      ],
      "points": [
        "授業は1対1か、講師1人が複数人を担当するか",
        "担当講師は固定か、変更時は事前に説明があるか",
        "教材やカリキュラムは誰が決めるか",
        "授業外の質問・家庭学習の相談はどこまで可能か",
        "月謝以外に必要な費用と、年間の概算総額はいくらか",
        "振替・休会・退会の条件はどうなっているか"
      ]
    }
  ],
  "closing": "教室で学ぶ環境を重視するなら個別指導塾、自宅での個別指導やオンラインで講師を選ぶことを重視するなら家庭教師が候補になります。最終的には、実際の授業内容と費用、本人との相性を同じ条件で比べてください。",
  "relatedLinks": [
    {
      "label": "料金・他社比較ガイドを見る",
      "url": "/hikaku/"
    },
    {
      "label": "家庭教師と塾の比較記事を読む",
      "url": "/blog/?article=kateikyoshi-or-cram-school"
    }
  ]
},
{
  "slug": "what-is-online-tutor",
  "category": "家庭教師の選び方",
  "date": "2026-11-07",
  "displayDate": "2026.11.07",
  "readingTime": "5分で読めます",
  "title": "オンライン家庭教師とは？対面型との違い・メリット・注意点を解説",
  "summary": "オンライン家庭教師の授業方法、必要な準備、対面型との違いを整理。通塾や訪問が不要になる利点だけでなく、画面越しの指導が合わない場合や通信環境の注意点も紹介します。",
  "tags": [
    "オンライン家庭教師",
    "対面指導",
    "家庭教師",
    "保護者向け"
  ],
  "intro": "オンライン家庭教師は、パソコンやタブレットなどを使い、インターネットを通じて講師と個別授業を行うサービスです。近くに希望する専門講師がいない場合や、通塾・送迎の時間を減らしたい場合に検討しやすい一方、対面授業とは異なる準備や相性の確認も必要です。",
  "sections": [
    {
      "heading": "1. オンライン家庭教師の授業はどのように進む？",
      "body": [
        "一般的には、ビデオ通話をつなぎ、講師と生徒が会話しながら授業を進めます。画面共有で問題や資料を見たり、デジタルホワイトボードに書き込んだり、手元のノートや教材をカメラで映したりする方法があります。利用する機能はサービスや講師によって異なります。",
        "授業前に教材・課題・目標を共有しておくと、接続後すぐに学習へ入りやすくなります。授業後に次回までの課題や確認事項を整理する運用かどうかも、比較ポイントです。"
      ]
    },
    {
      "heading": "2. オンラインならではのメリット",
      "body": [
        "大きな利点は、通塾や講師の訪問が不要になることです。移動や送迎の時間を抑えられ、地域に限定されず講師を検討できます。自宅など慣れた環境で授業を受けられることも、人によっては安心材料になります。",
        "英検や大学受験など専門分野を重視する場合、近隣だけでなく全国から候補を探せることは選択肢を広げます。保護者が授業の様子を把握しやすいかどうかは、実際の授業環境や家庭の希望に応じて確認してください。"
      ]
    },
    {
      "heading": "3. 注意点と、オンラインが合わない場合",
      "body": [
        "安定したインターネット回線、カメラ・マイクを備えた端末、授業に集中できる場所が必要です。画面越しでは表情や手元の様子が伝わりにくいことがあり、通信トラブルが授業を中断させる場合もあります。",
        "対面で同じ空間にいることを重視するお子様、画面操作に強い負担を感じるお子様、端末や通信環境を整えにくいご家庭には、訪問型や教室型のほうが合う可能性があります。オンラインが常に優れているわけではありません。"
      ]
    },
    {
      "heading": "4. 授業前に準備しておきたいもの",
      "body": [
        "基本的には、安定した通信環境、パソコンまたはタブレット、マイク・カメラ、筆記用具、教材を用意します。スマートフォンだけでも受講できる場合はありますが、問題文と講師の画面を同時に見づらいことがあるため、画面サイズや操作性を確認しましょう。",
        "初回の相談では、接続テスト、教材の映し方、カメラのオン・オフ、授業中の質問方法、トラブル時の連絡方法を確認しておくと安心です。"
      ]
    },
    {
      "heading": "5. オンライン家庭教師を選ぶときの確認項目",
      "body": [
        "サービス名や料金だけで決めず、実際に授業を担当する講師の経験・専門分野、1対1かどうか、担当の継続性、授業準備、振り返り、追加費用を確認してください。体験や事前相談がある場合は、本人が画面越しのやり取りに無理なく参加できるかも見ておきましょう。"
      ],
      "points": [
        "担当講師のプロフィールと指導経験が具体的か",
        "授業人数と担当講師の固定条件が明確か",
        "使用ツールと必要な端末・通信環境が分かるか",
        "授業後の課題・進捗共有の方法が決まっているか",
        "授業料以外の費用、欠席・振替条件が明示されているか",
        "オンライン授業が合わない場合の相談方法があるか"
      ]
    }
  ],
  "closing": "オンライン家庭教師は、通塾の負担を減らし、地域にとらわれず講師を探せる選択肢です。ただし、対面型との相性の違いもあります。鈴木雄太の指導は全国オンライン対応ですので、オンラインでの学び方や必要な準備を含めてご相談いただけます。",
  "relatedLinks": [
    {
      "label": "プロ家庭教師 鈴木雄太の指導内容を見る",
      "url": "/"
    },
    {
      "label": "英検対策の専門サイトを見る",
      "url": "/eiken/"
    },
    {
      "label": "不登校・通信制高校からの進路支援を見る",
      "url": "/bansou/"
    }
  ]
},
{
  "slug": "tutor-costs-compare",
  "category": "料金・費用",
  "date": "2026-11-07",
  "displayDate": "2026.11.07",
  "readingTime": "6分で読めます",
  "title": "家庭教師の料金相場を比べるには？月謝以外に確認したい費用と契約条件",
  "summary": "家庭教師の費用は授業料だけでは比べられません。入会金・管理費・交通費・教材費・講習費や、講師の担当形態、授業時間をそろえて総額を比較する方法を解説します。",
  "tags": [
    "家庭教師 料金",
    "月謝",
    "費用比較",
    "個人契約"
  ],
  "intro": "家庭教師を検討するとき、最初に目に入るのは1時間あたりの授業料や月謝です。しかし、実際に必要な金額は、入会金、管理費、交通費、教材費、季節講習、追加授業などによって変わります。料金を公平に比べるには、同じ授業条件にそろえ、契約全体で必要な費用を確認することが大切です。",
  "sections": [
    {
      "heading": "1. 料金は「1回あたり」と「月額」の両方で見る",
      "body": [
        "1回の授業料が安く見えても、授業時間や月の回数が違えば単純比較はできません。例えば、60分授業を月4回受ける場合と、90分授業を月4回受ける場合では、授業時間の合計が異なります。1時間あたりの金額と、月に受ける授業時間・回数をそろえて比較しましょう。",
        "また、通常月だけでなく、5週目がある月、長期休暇、受験直前の追加授業などで費用が変わるかも確認します。"
      ]
    },
    {
      "heading": "2. 授業料以外に確認したい費用",
      "body": [
        "契約先によって費用項目は異なります。入会金、月額管理費、教材費、講師の交通費、季節講習費、システム利用料、解約時の精算方法などを一覧にしてもらいましょう。オンライン指導では講師の交通費が不要な場合がありますが、端末や通信環境の準備が必要です。",
        "「教材費無料」など一つの項目だけで判断せず、必要な教材の購入先や、講習・追加授業が任意か必須かまで確認することが重要です。"
      ]
    },
    {
      "heading": "3. センター経由と講師との直接契約の違い",
      "body": [
        "家庭教師センター経由では、講師紹介、相談窓口、講師交代の仕組みなどが用意されている場合があります。その分、授業料以外に管理や運営に関する費用が含まれることもあります。サポートの内容と費用が見合うかを確認しましょう。",
        "講師との直接契約では、相談から授業まで同じ講師と話しやすい一方、契約条件、支払い、振替、休会・退会の取り決めを事前に確認する必要があります。どちらがよいかは、必要なサポートと家庭の希望によって異なります。"
      ]
    },
    {
      "heading": "4. 比較のために条件をそろえる",
      "body": [
        "複数の見積もりを取るときは、学年、指導科目、授業時間、月の回数、講師の経験、授業形式をできるだけそろえます。年間総額を比べる場合は、通常月に加えて講習や追加授業が必要になるケースも分けて試算してください。",
        "見積もりに含まれない費用がある場合は、何が別料金なのかを質問します。契約期間、解約の申し出期限、未受講分の返金・精算、振替条件も、金額と同じくらい大切です。"
      ]
    },
    {
      "heading": "5. 料金だけでなく、授業の中身と担当体制も比較する",
      "body": [
        "費用が安いか高いかだけでなく、授業準備、教材の選定、質問への対応、授業後の課題、保護者への報告、担当講師の継続性など、料金に含まれる内容を確認しましょう。授業料が同程度でも、授業時間やサポートの範囲が違えば、家庭が受け取る内容は異なります。"
      ],
      "points": [
        "1回の授業時間と月の授業回数",
        "講師の経験・専門科目・担当継続性",
        "入会金・管理費・教材費・交通費などの総額",
        "季節講習や追加授業の費用と任意性",
        "振替・休会・退会・返金の条件",
        "授業外の相談や保護者への報告範囲"
      ]
    }
  ],
  "closing": "料金の比較では、表面上の月謝ではなく、同じ授業条件で年間の総額とサポート内容を比べることが大切です。鈴木雄太の料金や他社との比較条件は、公式の比較ガイドで確認できます。",
  "relatedLinks": [
    {
      "label": "料金・他社比較ガイドで具体的に比べる",
      "url": "/hikaku/"
    },
    {
      "label": "公式サイトの料金・支払い方法を見る",
      "url": "/#pricing"
    }
  ]
},
    {
      slug: "eiken-study-roadmap",
      category: "英検対策",
      date: "2026-08-12",
      displayDate: "2026.08.12",
      readingTime: "4分で読めます",
      title:
        "英検の勉強は、何から始める？ 目標級と試験日から逆算する4つのステップ",
      summary:
        "単語帳から始める前に、目標級・現在地・試験日・4技能の優先順位を整理する。英検学習を遠回りにしないための考え方を解説します。",
      tags: ["英検", "4技能", "学習計画"],
      intro:
        "英検の勉強は、教材を増やすほど前に進むとは限りません。まず必要なのは、今の力と目標級の間にある差を、試験日までの時間に合わせて見える形にすることです。ここでは、初めて受験する方にも、もう一度挑戦する方にも共通する学習設計の順番を紹介します。",
      sections: [
        {
          heading: "1. 目標級だけでなく「受験する理由」を言葉にする",
          body: [
            "英検は、入試での活用、英語への自信づくり、学校の学習の確認など、受験する理由によって必要な準備が変わります。まずは「いつまでに、何のために合格したいか」を言葉にしてみましょう。理由が明確になると、受験日、目標スコア、優先する技能を決めやすくなります。",
            "例えば大学入試での利用を考える場合は、出願時期から逆算して受験機会を確保する必要があります。一方で、英語への苦手意識を減らすことが目的なら、無理に上の級へ急ぐより、成功体験につながる級と学習量を選ぶことも大切です。",
          ],
        },
        {
          heading: "2. 4技能を同じ比重で始めない",
          body: [
            "読む・聞く・書く・話すの4技能はすべて大切ですが、最初の課題は一人ひとり異なります。語彙や文法の土台が不足している場合、長文や英作文だけを繰り返しても負担が大きくなります。逆に、筆記ができても面接形式に慣れていない場合は、短い受け答えを早めに練習へ入れるほうが安心です。",
          ],
          points: [
            "語彙・文法：問題演習の前に、理解できていない単元を確認する",
            "リスニング：毎日短時間でも英語の音に触れる時間を固定する",
            "ライティング：型を覚え、添削を受けながら自分の表現にしていく",
            "スピーキング：本番直前だけでなく、短い音読・応答から慣れる",
          ],
        },
        {
          heading: "3. 試験日までを「週単位」で分ける",
          body: [
            "大きな目標を毎日眺めるだけでは、何をすべきかが曖昧になりがちです。試験日までの期間を、基礎を整える時期、形式に慣れる時期、過去問で弱点を確認する時期に分けてみましょう。週ごとに到達目標を置くと、学習が遅れたときも調整しやすくなります。",
            "模擬問題の点数だけで判断せず、「どの問題で迷ったか」「時間が足りなかった理由は何か」まで振り返ることが、次の1週間の学習内容を決める材料になります。",
          ],
        },
        {
          heading: "4. 困った時は、教材を増やす前に計画を見直す",
          body: [
            "勉強が進まないときは、新しい参考書を追加したくなるものです。しかし、原因が時間の使い方や土台の不足にあるなら、教材を増やしても負担が増えるだけです。今の教材で何ができ、どこで止まっているかを確認し、学習量・順番・期限を調整することから始めましょう。",
          ],
        },
      ],
      closing:
        "目標級や現在地によって、最適な順番は変わります。英検と学校の勉強、受験準備をどう両立するか迷う場合は、まず現在の状況を整理することからご相談いただけます。",
    },
    {
      slug: "humanities-exam-priority",
      category: "受験戦略",
      date: "2026-08-05",
      displayDate: "2026.08.05",
      readingTime: "5分で読めます",
      title:
        "文系受験、何から立て直す？ 英語・国語・社会の優先順位を決める考え方",
      summary:
        "英語・国語・社会を同時に伸ばそうとして苦しくなっている受験生へ。得点源、苦手分野、志望校の配点をもとに、学習の優先順位を決めるための視点を整理します。",
      tags: ["大学受験", "英語", "学習戦略"],
      intro:
        "文系受験では複数科目を同時に進める必要があるため、頑張っているのに成果が見えない時期が生まれやすくなります。大切なのは、3科目を均等にこなすことではなく、志望校合格に近づく順番で、限られた時間を配分することです。",
      sections: [
        {
          heading: "1. 志望校の配点と出題形式を最初に確認する",
          body: [
            "受験勉強は、一般的に得意と言われる科目から始めるとは限りません。志望校の配点、問題形式、必要な得点率を確認すると、優先すべき科目が変わることがあります。英語の配点が高い大学なら、語彙・文法・長文・英作文をどう積み上げるかが、他科目の計画にも影響します。",
            "志望校がまだ決まっていない場合も、候補をいくつか置き、必要科目と難度を比べるだけで、学習の方向性が見えやすくなります。",
          ],
        },
        {
          heading: "2. 「伸ばしやすい課題」と「時間がかかる課題」を分ける",
          body: [
            "暗記で補いやすい分野、演習の量で安定しやすい分野、基礎から時間をかける必要がある分野は同じではありません。今の模試や定期テストを見返し、単に点数が低い科目ではなく、原因を単元ごとに分けることが大切です。",
          ],
          points: [
            "英語：単語・文法の土台、長文の読み方、英作文のどこで失点しているか",
            "国語：現代文の根拠の取り方、古文単語・文法、漢文句法のどこが課題か",
            "社会：用語の暗記不足か、時代・テーマのつながりか、問題演習の不足か",
          ],
        },
        {
          heading: "3. 1週間の中に「積み上げ」と「確認」を両方入れる",
          body: [
            "毎日新しい内容だけを進めると、学んだことが定着しません。反対に、復習だけでは受験範囲が終わりません。1週間の計画に、基礎の積み上げ、問題演習、間違い直しの時間をそれぞれ入れ、週末に実行できたかを確認する形が現実的です。",
            "特に英語は、語彙や文法を毎日短時間で続けながら、週に数回は長文や英作文へ取り組むと、4技能・入試形式の両方に対応しやすくなります。",
          ],
        },
        {
          heading: "4. 計画は「守れなかった日」を前提にしておく",
          body: [
            "学校行事、体調、部活動などで、計画どおりに進まない週は必ずあります。そこで計画自体を諦めるのではなく、優先順位の低い課題を後ろへ移し、核になる学習を守る方法を考えます。受験直前ほど、この調整力が大きな差になります。",
          ],
        },
      ],
      closing:
        "志望校・現在地・使える時間によって、優先順位は変わります。英検取得と大学受験を同時に進める場合も、科目の役割を整理すれば、無理のない計画を作れます。",
    },
    {
      slug: "restart-study-at-home",
      category: "不登校・通信制",
      date: "2026-07-28",
      displayDate: "2026.07.28",
      readingTime: "4分で読めます",
      title:
        "学校に通いづらい時期、学習をどう再開する？ 小さな一歩から整える方法",
      summary:
        "学校に通えていない時期の学習は、量よりも安心して続けられる形が重要です。保護者とお子様が無理なく始めるための、目標設定と環境づくりを紹介します。",
      tags: ["不登校", "通信制高校", "保護者向け"],
      intro:
        "学校に通いづらい時期は、学習の遅れだけでなく、生活リズムや自己肯定感、周囲との比較など、さまざまな不安が重なります。学習再開の目的は、すぐに遅れを取り戻すことだけではありません。安心して「できた」を積み重ね、次の選択肢へ進む土台を作ることです。",
      sections: [
        {
          heading: "1. 最初の目標は「続けられる量」にする",
          body: [
            "始めるときから長時間の学習を目標にすると、負担が大きくなり、続かなかった経験が残りやすくなります。最初は10分、1問、短い会話など、本人が取り組みやすい量から始めます。できたら少しずつ増やすという順番が、長く続けるための土台になります。",
          ],
        },
        {
          heading: "2. 学力より先に、取り組める環境を整える",
          body: [
            "机に向かうことが難しい場合は、教材の難度だけではなく、時間帯、声かけ、画面越しのやり取りなども見直します。カメラをオフにする、チャットから始める、好きなテーマを英語や国語の教材へつなげるなど、安心できる入口を選ぶことができます。",
            "保護者の方も、毎日結果を確認するより、「今日は何ができたか」を一緒に振り返る関わり方を試すと、学習が評価だけの時間になりにくくなります。",
          ],
        },
        {
          heading: "3. 学習と進路を切り離さず、急ぎすぎない",
          body: [
            "通信制高校、高卒認定、英検、大学受験など、将来の選択肢は一つではありません。だからこそ、今の状況を否定せず、どの時期にどの選択肢を準備するかを考えます。英検は、英語の力を確認しながら小さな達成感を作れる選択肢の一つにもなります。",
          ],
        },
        {
          heading: "4. 相談する相手を一人に絞らない",
          body: [
            "本人・保護者・学校・支援機関・講師が、それぞれ違う情報を持っています。すべてを一度に解決しようとせず、学習面の相談、進路の相談、生活面の相談を必要に応じて分けながら、情報をつなげていくことが大切です。",
          ],
        },
      ],
      closing:
        "今の状態に合わせて、学び方も目標も調整できます。保護者様だけで状況を整理するご相談からでも、お気軽にお問い合わせください。",
    },
  ];

  const root = document.getElementById("content-hub-root");
  const activeArticle = new URLSearchParams(window.location.search).get(
    "article",
  );

  const escapeHtml = (value) =>
    String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const localUrl = (slug) =>
    `${window.location.origin}/blog/?article=${encodeURIComponent(slug)}`;

  const external = (url) =>
    `href="${url}" target="_blank" rel="noopener noreferrer"`;

  const setMeta = (selector, content) => {
    const element = document.querySelector(selector);
    if (element) element.setAttribute("content", content);
  };

  const updatePageMeta = (article) => {
    const url = article
      ? localUrl(article.slug)
      : `${window.location.origin}/blog/`;
    const title = article
      ? `${article.title}｜プロ家庭教師 鈴木雄太の教育コラム`
      : "教育コラム｜英検・受験・学習法をわかりやすく解説｜プロ家庭教師 鈴木雄太";
    const description = article
      ? article.summary
      : "家庭教師と塾の選び方、個別指導と家庭教師の違い、オンライン指導、料金比較から、英検・受験・不登校まで保護者の疑問に答える教育コラムです。";
    document.title = title;
    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[name="twitter:title"]', title);
    setMeta('meta[name="twitter:description"]', description);
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", url);
    const schemaId = "article-structured-data";
    let schemaNode = document.getElementById(schemaId);
    if (article) {
      if (!schemaNode) {
        schemaNode = document.createElement("script");
        schemaNode.id = schemaId;
        schemaNode.type = "application/ld+json";
        document.head.appendChild(schemaNode);
      }
      schemaNode.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description: article.summary,
        datePublished: article.date,
        dateModified: article.date,
        mainEntityOfPage: url,
        author: { "@type": "Person", name: "鈴木雄太", jobTitle: "プロ家庭教師" },
        publisher: { "@type": "Organization", name: "プロ家庭教師 鈴木雄太", url: "https://kateikyoshi-sogo.com/" },
        inLanguage: "ja-JP",
        articleSection: article.category,
        keywords: article.tags.join(", ")
      });
      setMeta('meta[property="og:type"]', "article");
    } else {
      schemaNode?.remove();
      setMeta('meta[property="og:type"]', "website");
    }
  };

  const profileLinks = () => {
    const enabled = SOCIAL_PROFILES.filter((profile) => profile.url);
    if (!enabled.length) {
      return `<p class="hub-profile-empty">公式SNSは準備中です。記事の共有ボタンはすぐにご利用いただけます。</p>`;
    }
    return `<div class="hub-profile-links">${enabled
      .map(
        (profile) =>
          `<a ${external(profile.url)} class="hub-profile-link hub-profile-link--${profile.tone}"><span>${escapeHtml(profile.label)}</span>${escapeHtml(profile.name)}へ</a>`,
      )
      .join("")}</div>`;
  };

  const articleCard = (article, featured = false) => `
    <article class="hub-card${featured ? " hub-card--featured" : ""}">
      <div class="hub-card-meta"><span>${escapeHtml(article.category)}</span><time datetime="${article.date}">${escapeHtml(article.displayDate)}</time><small>${escapeHtml(article.readingTime)}</small></div>
      <h2><a href="?article=${encodeURIComponent(article.slug)}">${escapeHtml(article.title)}</a></h2>
      <p>${escapeHtml(article.summary)}</p>
      <div class="hub-tags">${article.tags.map((tag) => `<span>#${escapeHtml(tag)}</span>`).join("")}</div>
      <a class="hub-card-link" href="?article=${encodeURIComponent(article.slug)}">記事を読む <span>→</span></a>
    </article>`;

  const renderIndex = () => {
    updatePageMeta(null);
    const categories = [
      "すべて",
      ...new Set(ARTICLES.map((article) => article.category)),
    ];
    root.innerHTML = `
      <header class="hub-header">
        <div class="hub-header-inner">
          <a class="hub-brand" href="../" aria-label="プロ家庭教師 鈴木雄太 公式サイト トップへ戻る"><span>プロ家庭教師</span>鈴木雄太のオンライン指導</a>
          <nav aria-label="教育コラムのナビゲーション"><a href="../">公式サイトへ</a><a href="#articles">記事一覧</a><a href="${LEGACY_BLOG_URL}" target="_blank" rel="noopener noreferrer">旧ブログ ↗</a></nav>
        </div>
      </header>
      <main>
        <section class="hub-hero">
          <div class="hub-shell">
            <p class="hub-kicker">EDUCATION JOURNAL</p>
            <h1>英検・受験・学習法を、<br>次の一歩につながる言葉で。</h1>
            <p>家庭教師と塾の選び方、個別指導の違い、オンライン指導や料金比較から、英検・大学受験・不登校まで。お子様と保護者様の疑問を整理し、納得できる学び方を考える教育コラムです。</p>
            <div class="hub-hero-actions"><a href="#articles" class="hub-button">新着記事を読む <span>↓</span></a><a ${external(LEGACY_BLOG_URL)} class="hub-button hub-button--outline">旧ブログを見る <span>↗</span></a></div>
          </div>
        </section>
        <section class="hub-featured"><div class="hub-shell"><p class="hub-section-label">LATEST ARTICLE</p><div class="hub-featured-grid"><div><h2>最初に読んでほしい記事</h2><p>教材や勉強時間を増やす前に、目標と現在地を整理することから始めましょう。</p></div>${articleCard(ARTICLES[0], true)}</div></div></section>
        <section id="articles" class="hub-articles"><div class="hub-shell"><div class="hub-section-heading"><div><p class="hub-section-label">ALL ARTICLES</p><h2>教育コラム一覧</h2></div><label class="hub-search"><span class="sr-only">記事を検索</span><input id="article-search" type="search" placeholder="キーワードで探す" autocomplete="off"></label></div><div class="hub-filter" role="tablist" aria-label="記事カテゴリー">${categories.map((category, index) => `<button class="hub-filter-button${index === 0 ? " is-active" : ""}" type="button" data-category="${escapeHtml(category)}" role="tab" aria-selected="${index === 0}">${escapeHtml(category)}</button>`).join("")}</div><div id="article-list" class="hub-card-grid">${ARTICLES.map((article) => articleCard(article)).join("")}</div><p id="article-empty" class="hub-empty" hidden>条件に合う記事は見つかりませんでした。別のキーワードでお試しください。</p></div></section>
        <section class="hub-social"><div class="hub-shell hub-social-grid"><div><p class="hub-section-label">SHARE & FOLLOW</p><h2>役立った記事は、<br>必要な方へ共有してください。</h2><p>個別記事では、X・LINEへの共有とURLコピーができます。公式SNSの新着情報も、準備でき次第ここからご案内します。</p></div><div class="hub-social-panel"><h3>公式SNS</h3>${profileLinks()}<a href="${CONTACT_URL}" class="hub-text-link">英検・受験のご相談はこちら <span>→</span></a></div></div></section>
      </main>
      <footer class="hub-footer"><div class="hub-shell"><a class="hub-brand" href="../"><span>プロ家庭教師</span>鈴木雄太のオンライン指導</a><p>英検・受験・不登校・通信制高校まで、全国オンラインで対応しています。</p><a href="${CONTACT_URL}">無料相談・お問い合わせ</a></div></footer>`;

    let category = "すべて";
    const list = document.getElementById("article-list");
    const empty = document.getElementById("article-empty");
    const search = document.getElementById("article-search");
    const renderCards = () => {
      const keyword = search.value.trim().toLowerCase();
      const filtered = ARTICLES.filter((article) => {
        const categoryMatch =
          category === "すべて" || article.category === category;
        const corpus = [
          article.title,
          article.summary,
          article.category,
          ...article.tags,
        ]
          .join(" ")
          .toLowerCase();
        return categoryMatch && (!keyword || corpus.includes(keyword));
      });
      list.innerHTML = filtered.map((article) => articleCard(article)).join("");
      empty.hidden = Boolean(filtered.length);
    };
    document.querySelectorAll(".hub-filter-button").forEach((button) => {
      button.addEventListener("click", () => {
        category = button.dataset.category;
        document.querySelectorAll(".hub-filter-button").forEach((item) => {
          const active = item === button;
          item.classList.toggle("is-active", active);
          item.setAttribute("aria-selected", String(active));
        });
        renderCards();
      });
    });
    search.addEventListener("input", renderCards);
  };

  const shareMarkup = (article) => {
    const url = encodeURIComponent(localUrl(article.slug));
    const text = encodeURIComponent(`${article.title}｜プロ家庭教師 鈴木雄太`);
    return `<div class="hub-share" aria-label="この記事を共有"><p>この記事を共有する</p><div><button type="button" class="hub-share-button hub-share-button--native" data-share="native">共有</button><a class="hub-share-button hub-share-button--x" ${external(`https://twitter.com/intent/tweet?text=${text}&url=${url}`)}>X</a><a class="hub-share-button hub-share-button--line" ${external(`https://social-plugins.line.me/lineit/share?url=${url}`)}>LINE</a><button type="button" class="hub-share-button hub-share-button--copy" data-share="copy">URLをコピー</button></div><span class="hub-share-message" aria-live="polite"></span></div>`;
  };

  const articleSection = (section) => `
    <section class="hub-article-section">
      <h2>${escapeHtml(section.heading)}</h2>
      ${section.body.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
      ${section.points ? `<ul>${section.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul>` : ""}
    </section>`;

  const renderArticle = (article) => {
    updatePageMeta(article);
    const related = ARTICLES.filter((item) => item.slug !== article.slug).slice(
      0,
      2,
    );
    root.innerHTML = `
      <header class="hub-header"><div class="hub-header-inner"><a class="hub-brand" href="../"><span>プロ家庭教師</span>鈴木雄太のオンライン指導</a><nav aria-label="教育コラムのナビゲーション"><a href="./">記事一覧</a><a href="../">公式サイトへ</a></nav></div></header>
      <main><article class="hub-article"><div class="hub-shell hub-article-shell"><a href="./" class="hub-back-link">← 教育コラム一覧へ戻る</a><header class="hub-article-header"><p class="hub-card-meta"><span>${escapeHtml(article.category)}</span><time datetime="${article.date}">${escapeHtml(article.displayDate)}</time><small>${escapeHtml(article.readingTime)}</small></p><h1>${escapeHtml(article.title)}</h1><p>${escapeHtml(article.summary)}</p><div class="hub-tags">${article.tags.map((tag) => `<span>#${escapeHtml(tag)}</span>`).join("")}</div></header><div class="hub-article-body"><p class="hub-article-lead">${escapeHtml(article.intro)}</p>${article.sections.map(articleSection).join("")}<div class="hub-article-closing"><p>${escapeHtml(article.closing)}</p>${article.relatedLinks ? `<nav class="hub-article-related-links" aria-label="関連する公式ページ">${article.relatedLinks.map((link) => `<a class="hub-text-link" href="${escapeHtml(link.url)}">${escapeHtml(link.label)} <span>→</span></a>`).join("")}</nav>` : ""}<a href="${CONTACT_URL}" class="hub-button">無料相談で状況を整理する <span>→</span></a></div></div>${shareMarkup(article)}</div></article><section class="hub-related"><div class="hub-shell"><p class="hub-section-label">RELATED ARTICLES</p><h2>あわせて読みたい記事</h2><div class="hub-card-grid">${related.map((item) => articleCard(item)).join("")}</div></div></section></main><footer class="hub-footer"><div class="hub-shell"><a class="hub-brand" href="../"><span>プロ家庭教師</span>鈴木雄太のオンライン指導</a><p>英検・受験・不登校・通信制高校まで、全国オンラインで対応しています。</p><a href="${CONTACT_URL}">無料相談・お問い合わせ</a></div></footer>`;
    root.querySelectorAll("[data-share]").forEach((button) => {
      button.addEventListener("click", async () => {
        const message = root.querySelector(".hub-share-message");
        if (button.dataset.share === "copy") {
          try {
            await navigator.clipboard.writeText(localUrl(article.slug));
            message.textContent = "記事のURLをコピーしました。";
          } catch (_) {
            message.textContent =
              "URLのコピーに失敗しました。ブラウザのアドレス欄からコピーしてください。";
          }
          return;
        }
        if (navigator.share) {
          try {
            await navigator.share({
              title: article.title,
              text: article.summary,
              url: localUrl(article.slug),
            });
            message.textContent = "共有画面を開きました。";
          } catch (_) {}
        } else {
          try {
            await navigator.clipboard.writeText(localUrl(article.slug));
            message.textContent =
              "共有機能に対応していないため、URLをコピーしました。";
          } catch (_) {
            message.textContent =
              "X・LINEの共有ボタン、またはアドレス欄をご利用ください。";
          }
        }
      });
    });
  };

  const article = ARTICLES.find((item) => item.slug === activeArticle);
  if (activeArticle && !article) {
    window.history.replaceState({}, "", "/blog/");
  }
  article ? renderArticle(article) : renderIndex();
})();
