export interface Article {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  author: string;
  publishDate: string;
  readTime: string;
  content: string[]; // split by paragraphs
  citations: string[];
  defaultTeaser: {
    teaserCopy: string;
    canvaQuotes: string[];
    indexingTags: string[];
    analyticalGrade: string;
    editorialSuggestions: string;
  };
}

export const articles: Article[] = [
  {
    id: "thesis-of-cassiciacum",
    title: "The Thesis of Cassiciacum: Roman Catholic Clerical Succession & Material Authority",
    subtitle: "Explaining Father Guérard des Lauriers' Scholastic Resolution to the Modern Vacancy of the Holy See",
    category: "Theological Studies",
    author: "Fr. Thomas Aquinas-Marie, OSB (Hon.)",
    publishDate: "January 14, 2026",
    readTime: "9 min read",
    content: [
      "In the decades following the Second Vatican Council, traditional Roman Catholics have faced an unprecedented crisis of authority. How can the Church remain indefectible if those who claim to occupy the Chair of Saint Peter promulgate teachings and liturgies that seem in direct rupture with the infallible Tridentine deposit? To this jurisdictional crisis, a brilliant scholastic answers. Father Michel-Louis Guérard des Lauriers, OP—a former professor at the Pontifical Lateran University and co-author of the Ottaviani Intervention—formulated the 'Thesis of Cassiciacum' (also known as the material-formal thesis).",
      "The core of the Thesis lies in a refined distinction inherited from Thomistic metaphysics: the distinction between the 'material' and 'formal' elements of an office. Father des Lauriers argues that a papal claimant can be elected through valid legal channels and hold physical occupancy of the Holy See, which constitutes holding the office 'materially' (papa materialiter). However, due to a lack of objective intention to promote the true spiritual good and essential ends of the Church, such a claimant lacks the divine confirmation or 'formal' authority to teach, bind, or rule (papa formaliter).",
      "This distinction is crucial because it bypasses the standard traps of theological simplisticism. If a claimant were not pope in any sense whatsoever (totalism), the legal continuity of the hierarchy would be entirely broken, leaving no lawful electors to populate the See in future conclaves. Conversely, if a claimant has full formal authority despite proclaiming errors, then the dogmas of papal infallibility and the indefectibility of the Church's universal laws are undermined. The Thesis solves this conundrum by preserving the material succession—the legal, physical lineage of the bishoprics—while recognizing the moral vacancy of formal ruling authority.",
      "Opponents of the Thesis often argue that a person who lacks authority cannot be a legal Pope in any sense. Yet, scholastic jurisprudence, drawing from Cardinal Cajetan and St. Robert Bellarmine, notes that of manual law and physical tenure, a legal election creates a 'designatus'—one who has been designated to receive authority. Until the designated pope removes the objective obstacle (i.e., by repenting of liturgical or doctrinal modifications and fully submitting to the traditional magisterial definitions), he remains in a state of suspended designation. He occupies the throne, yet he cannot act with the divine authority of Jesus Christ.",
      "As we contemplate this state of ecclesial exile, traditional scholars are urged to study des Lauriers' work with intellectual sobriety. It rejects both the absolute sedevacantism that cannot explain the survival of legal episcopal succession, and the blind obedience that swallows the modernized parameters of the Novus Ordo. The Thesis of Cassiciacum remains a humble, intellectually rigorous attempt to explain how the gates of hell have not prevailed, preserving both the visible legality of the Church and the pure, unadulterated traditional Faith."
    ],
    citations: [
      "Guérard des Lauriers, Michel-Louis. 'Le Cahier de Cassiciacum' Vol. I, Nice, 1979.",
      "Cajetan, Cardinal Tommaso de Vio. 'De Comparatione Auctoritatis Papae et Concilii', 1511.",
      "Bellarmine, Saint Robert. 'De Romano Pontifice', Book II, Chapter 30."
    ],
    defaultTeaser: {
      teaserCopy: "Can a claimant indeed hold the pontifical office materially but not formally? Explore Father Guérard des Lauriers' historic Thesis of Cassiciacum—a brilliant scholastic resolution to our contemporary ecclesial exile. Our latest archival monograph provides a rigorous canonical walkthrough of vacant authority, succession, and the preservation of apostolic visibility. Read the complete study in our permanent repository.",
      canvaQuotes: [
        "\"The occupier of the See remains materially Pope, but lacks the formal authority to rule.\"",
        "\"Habere sedem non est habere auctoritatem.\"",
        "\"A theological roadmap to guide traditionalists through the modern ecclesiastical wilderness.\""
      ],
      indexingTags: ["#ThesisOfCassiciacum", "#SedesVacans", "#TraditionalCatholicism", "#ScholasticSuccession"],
      analyticalGrade: "Scholastic / For Advanced Laymen",
      editorialSuggestions: "Consider augmenting the section on the 'material-formal' distinction with direct citations from Cardinal Cajetan's commentaries on the Summa Theologiae to satisfy the most rigorous readers."
    }
  },
  {
    id: "liturgical-continuity",
    title: "The Liturgical Continuity: Protecting the Latin Rite and the Perpetual 'Quo Primum'",
    subtitle: "A Canonical Study of Pope St. Pius V's Dogmatic Safeguard of the Mass of the Ages",
    category: "Liturgical Defense",
    author: "Rev. Dr. Athanasius Vance",
    publishDate: "February 23, 2026",
    readTime: "7 min read",
    content: [
      "In the wake of the Council of Trent, Pope Saint Pius V was tasked with standardizing the Roman Rite to protect the Church against protestant deviations. In 1570, he issued the apostolic constitution 'Quo Primum'. Far from being a mere disciplinary directive of temporal force, Quo Primum was promulgated as a perpetual decree, binding on all future popes, prelates, and priests. It guaranteed that any priest, secular or regular, could use the Gregorian Roman Missal without hindrance, punishment, or fear of canonical penalty.",
      "The key phrase of Quo Primum resides in its unalterable binding clauses: 'We grant in perpetuity that this Mass may be sung or said in any church whatsoever, and that this present Constitution... can never be revoked or modified.' Modern liturgists often assert that disciplinary laws can be changed by subsequent Roman Pontiffs. While administrative laws are indeed reformable, the traditional Roman Missal is not a mere 'discipline'—it is the dogmatic synthesis of Catholic eucharistic theology, encapsulated in ancient organic prayers dating back to Saint Gregory the Great and the Apostles.",
      "The maxim 'Lex Orandi, Lex Credendi' (the law of prayer is the law of belief) dictates that the liturgy is the outer armor of dogma. When St. Pius V codified the traditional Roman Rite, he was not creating a new service; he was protecting an organic, apostolic inheritance from arbitrary novelty. Thus, Quo Primum carries a magisterial weight that transcends ordinary liturgical regulation: it acts as a dogmatic boundary. Any attempt to prohibit this Mass constitutes an overreach that violates the unalterable common law of the Catholic Church.",
      "Traditional priests under threat of suspensions a divinis have consistently appealed to Quo Primum as their primary legal shield. Since the modern Novus Ordo Missae of 1969 introduced ambiguous prayers that softened traditional propitiatory language, priests have a moral obligation to resist the liturgical rupture. To abandon the Gregorian Rite would mean abandoning the unequivocal doctrinal clarity that St. Pius V permanently safeguarded for the survival of the Catholic priesthood.",
      "As we strive to maintain liturgical preservation, let us take courage. Quo Primum remains as legally binding today as it was in 1570. The unalterable privilege granted by Pope Saint Pius V ensures that every altar where the traditional Mass is offered remains a sanctuary of absolute ecclesiastical legitimacy and apostolic truth."
    ],
    citations: [
      "Pope Saint Pius V. Apostolic Constitution 'Quo Primum Tempore', July 14, 1570.",
      "Gamber, Monsignor Klaus. 'The Reform of the Roman Liturgy', 1989.",
      "Davies, Michael. 'Pope Paul's New Mass', Augustine Publishing, 1980."
    ],
    defaultTeaser: {
      teaserCopy: "Is the traditional Latin Mass merely a historical preference, or is it protected by a perpetual, unalterable papal decree? Analyze the historic codification of St. Pius V's bull 'Quo Primum' and its binding canonical force across five centuries. Our newest editorial examination dismantles the modern myths and restores traditional clarity. Tap below for the full scholarly defense.",
      canvaQuotes: [
        "\"We grant in perpetuity that this Mass may be sung or said in any church whatsoever.\"",
        "\"Lex Orandi, Lex Credendi—the law of prayer is the law of belief.\"",
        "\"Quo Primum stands as an unyielding wall against liturgical experiment.\""
      ],
      indexingTags: ["#LatinMass", "#QuoPrimum", "#TraditionalLiturgy", "#StPiusV"],
      analyticalGrade: "Highly Rigorous / Archival Defense",
      editorialSuggestions: "We advise adding a direct comparison tab displaying the Gregorian Rite alongside the 1962 modifications to illustrate the strict organic continuity needed for preservation."
    }
  },
  {
    id: "great-empty-chairs",
    title: "The Great Empty Chairs: Historically Gauging the Papal Interregnums",
    subtitle: "How Historical Precedents Demystify the Longevity of Modern Sedevacantism",
    category: "Historical Theology",
    author: "Prof. Charles D. Gallagher",
    publishDate: "March 11, 2026",
    readTime: "8 min read",
    content: [
      "The principal psychological barrier for many Catholics considering sedevacantism is the sheer duration of our present exile. If the Chair of St. Peter has been formally vacant since the death of Pope Pius XII in 1958, how could Christ's promise of indefectibility hold true over a span of decades? Under close historical examination, this objection loses its theological force. The annals of Church history reveal that lengthy vacancies and profound theological confusion are a recurrent reality, not an impossible anomaly.",
      "The most famous ecclesiastical interregnum occurred in Viterbo following the death of Pope Clement IV in 1268. The cardinals, severely divided, failed to elect a successor for nearly three years—a total of 1,006 days. During this period, the administration of the Church operated successfully without a residing Sovereign Pontiff. Sacraments were administered, diocesan tribunals functioned under supplied authority, and the visible boundaries of the Western Church remained fully intact. Viterbo proved that a prolonged absence of a visible Head does not extinguish the supernatural life of the Mystical Body of Christ.",
      "An even more severe crisis emerged during the Great Western Schism (1378–1417), where up to three different rival claimants simultaneously demanded obedience from European monarchs. For nearly forty years, the average Catholic layman could not determine with absolute theological certainty who the true Roman Pontiff was. Saints of impeccable holiness, such as Saint Vincent Ferrer and Saint Catherine of Siena, found themselves operating under different obediences. The Western Schism demonstrated that the Mystical Body can survive immense structural fragmentation, with the seat of authority temporarily obscured from sight.",
      "Traditional theologians point to these historical precedents to establish a vital principle: the Church's indefectibility requires the preservation of the Deposit of Faith and the succession of valid holy orders, but it is not bound by the speedy duration of an ecclesiastical conclave. St. Vincent Ferrer famously preached that the true unity of the Church rests on the preservation of traditional dogma, even if the primary earthly ruler is temporarily missing or disputed.",
      "Rather than despairing over the length of our contemporary interregnum, we must recognize it as a historical trial of greater scale but identical nature to those negotiated by our ancestors. The vacant thrones of Viterbo and Rome in ages past serve as dynamic proof that Christ remains with His flock, and that the visible, apostolic authority will be restored precisely when God's providence decrees."
    ],
    citations: [
      "Salembier, Louis. 'The Great Schism of the West', International Catholic Library, 1907.",
      "Mann, Horace K. 'The Lives of the Popes in the Middle Ages', Vol. XV.",
      "Ferrer, Saint Vincent. 'Tractatus de Moderno Ecclesiae Schismate', c. 1380."
    ],
    defaultTeaser: {
      teaserCopy: "With the chair of Peter seemingly vacant, many ask: is our era unprecedented? Step back to 1268 and discover how a three-year conclave resulted in Roman Catholic perseverance. By reviewing lengthy historic Western Interregnums, we find that the indefectibility of the Church is not bound by the immediate speed of an election, but by the true deposit of Faith. Join the conversation online.",
      canvaQuotes: [
        "\"The longest papal interregnum in history endured for thirty-four months under God's providence.\"",
        "\"Indefectibility does not require a perpetual living Pope, but a perpetual visible deposit of faith.\"",
        "\"Ubi fides, ibi Ecclesia—where the faith is, there is the Church.\""
      ],
      indexingTags: ["#PapalInterregnum", "#ChurchHistory", "#CanonLaw", "#WesternSchism"],
      analyticalGrade: "Historical Narrative & Canonical Analysis",
      editorialSuggestions: "To enhance reader comprehension, integrate a comparative table ranking historic papal vacancies (1268-1271, Western Schism, 1800) alongside chronological milestones of traditional governance."
    }
  },
  {
    id: "jurisdictional-conundrum",
    title: "The Jurisdictional Conundrum: Sacraments in Times of Holy See Vacancy",
    subtitle: "An Examination of Canonical Epikeia and Supplied Jurisdiction for the Salvation of Souls",
    category: "Canon Law & Jurisprudence",
    author: "Monsignor G. H. Duggan, PhD",
    publishDate: "April 05, 2026",
    readTime: "11 min read",
    content: [
      "In a traditional parish, the administration of confessions, confirmations, and marriages is a source of daily comfort. Yet, under the strict parameters of canonical text, these sacraments require either ordinary or delegated jurisdiction from the diocesan bishop or the Roman Pontiff. In a prolonged state of sedevacantism, where the diocesan chairs are missing or held by modernist claimants with whom we cannot hold communion, how can traditional priests lawfully administer these sacraments? This question goes to the very heart of traditionalist canon law.",
      "The resolution of this crisis relies on two classical pillars of Catholic jurisprudence: the principle of 'Epikeia' and the doctrine of 'supplied jurisdiction' (Ecclesia Supplet). Epikeia, or equity, is a benign interpretation of the law according to the true intention of the legislator, when the literal letter of the law would result in an excessive hardship or defeat the purpose of the law itself. Because the ultimate purpose of all canon law is the salvation of souls ('salus animarum suprema lex'), any administrative regulation that blocks access to the sacraments during a theological catastrophe is suspended by the natural demands of charity.",
      "Furthermore, Canon 2261, paragraph 2 of the 1917 Code of Canon Law specifically states that the faithful may, for any just cause, request sacraments from an excommunicated or suspended priest, especially if they are in danger of death or in spiritual need, and that the Church supplies the necessary jurisdiction for the sake of the recipient. If the Church supplies jurisdiction even for priestly acts under extreme penalties, she undoubtedly supplies it for faithful priests who have preserved valid orders and seek exclusively to perpetuate Catholic life.",
      "Some legalists object that public sacraments without direct episcopal mandates lead to anarchy. However, traditionalist bishops consecrated under emergency circumstances—such as Archbishop Pierre Martin Ngô Đình Thục and Archbishop Marcel Lefebvre—pointed out that the emergency preservation of valid holy orders and sacraments is not a rebellion, but an act of supreme canonical obedience to Christ's original command: 'Go into all the world and preach the gospel to every creature.' When the ordinary structures fail, the apostolic duty reverts to emergency channels.",
      "We must avoid the terminal error of legalistic pharisaism, which would let souls perish in a state of mortal sin so that administrative protocols can be cosmetically satisfied. The jurisdictional conundrum is solved by recognizing that Christ’s love for His flock is not a dead letter locked in a vacant bureau, but an active, breathing, supplying reality that ensures grace remains accessible to all who seek it in spirit and in truth."
    ],
    citations: [
      "1917 Code of Canon Law (Codex Iuris Canonici), Canon 2261, §2 and Canon 20.",
      "Augustine, Rev. Charles. 'A Commentary on the New Code of Canon Law', B. Herder, 1918.",
      "Cicognani, Amleto Cardinal. 'Canon Law', Newman Bookshop, 1934."
    ],
    defaultTeaser: {
      teaserCopy: "How do traditionalists resolve the sacramental and jurisdictional emergency of our epoch? In this detailed study of traditional governance, we investigate canonical epikeia and the divine right to save souls. Read this essential defense of apostolic succession on our central archival site. Link below.",
      canvaQuotes: [
        "\"Salus animarum suprema lex—the salvation of souls is the supreme law.\"",
        "\"The obligation of the sacramental order supersedes temporary administrative directives.\"",
        "\"Jurisdiction in emergency is supplied directly by Christ for the spiritual good of the faithful.\""
      ],
      indexingTags: ["#EmergencyJurisdiction", "#Epikeia", "#TraditionalSacraments", "#CanonLaw"],
      analyticalGrade: "Advanced Juridical / Canonical Focus",
      editorialSuggestions: "Ensure that 'epikeia' is carefully distinguished from modern moral relativism, emphasizing that emergency jurisdiction arises exclusively out of the objective demands of sacramental survival."
    }
  }
];
