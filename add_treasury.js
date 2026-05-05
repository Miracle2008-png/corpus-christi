const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data', 'prayers.json');
const prayers = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Check if Treasury already exists
if (!prayers.some(cat => cat.slug === 'treasury')) {
  prayers.push({
    category: "Catholic Treasury",
    slug: "treasury",
    icon: "🕊",
    description: "The spiritual riches of the Church: lists, works, virtues, and powerful intercessory prayers.",
    prayers: [
      {
        id: "corporal-works-of-mercy",
        title: "The Corporal Works of Mercy",
        text: "1. To feed the hungry.\n2. To give drink to the thirsty.\n3. To clothe the naked.\n4. To shelter the homeless.\n5. To visit the sick.\n6. To visit the imprisoned.\n7. To bury the dead.",
        source: "Matthew 25:31-46",
        note: "These are charitable actions by which we come to the aid of our neighbor in their bodily necessities."
      },
      {
        id: "spiritual-works-of-mercy",
        title: "The Spiritual Works of Mercy",
        text: "1. To instruct the ignorant.\n2. To counsel the doubtful.\n3. To admonish sinners.\n4. To bear wrongs patiently.\n5. To forgive offenses willingly.\n6. To comfort the afflicted.\n7. To pray for the living and the dead.",
        note: "These are actions that help our neighbor in their spiritual needs."
      },
      {
        id: "gifts-of-the-holy-spirit",
        title: "The Seven Gifts of the Holy Spirit",
        text: "1. Wisdom\n2. Understanding\n3. Counsel\n4. Fortitude\n5. Knowledge\n6. Piety\n7. Fear of the Lord (Reverence)",
        source: "Isaiah 11:2-3",
        note: "These gifts belong in their fullness to Christ, but they complete and perfect the virtues of those who receive them."
      },
      {
        id: "fruits-of-the-holy-spirit",
        title: "The Twelve Fruits of the Holy Spirit",
        text: "1. Charity (Love)\n2. Joy\n3. Peace\n4. Patience\n5. Kindness\n6. Goodness\n7. Generosity\n8. Gentleness\n9. Faithfulness\n10. Modesty\n11. Self-control\n12. Chastity",
        source: "Galatians 5:22-23 (Tradition)",
        note: "These are perfections that the Holy Spirit forms in us as the first fruits of eternal glory."
      },
      {
        id: "prayer-to-st-michael",
        title: "Prayer to St. Michael the Archangel",
        latin: "Sancte Michael Archangele",
        text: "St. Michael the Archangel, defend us in battle,\nbe our protection against the wickedness and snares of the devil.\nMay God rebuke him we humbly pray;\nand do thou, O Prince of the Heavenly host,\nby the power of God, cast into hell Satan and all the evil spirits\nwho prowl about the world seeking the ruin of souls. Amen.",
        note: "Composed by Pope Leo XIII in 1886. A powerful prayer for spiritual warfare and protection."
      },
      {
        id: "prayer-to-st-joseph",
        title: "Prayer to St. Joseph",
        text: "To you, O blessed Joseph, do we come in our tribulation, and having implored the help of your most holy Spouse, we confidently invoke your patronage also.\n\nThrough that charity which bound you to the Immaculate Virgin Mother of God and through the paternal love with which you embraced the Child Jesus, we humbly beg you graciously to regard the inheritance which Jesus Christ has purchased by his Blood, and with your power and strength to aid us in our necessities.\n\nO most watchful guardian of the Holy Family, defend the chosen children of Jesus Christ; O most loving father, ward off from us every contagion of error and corrupting influence; O our most mighty protector, be kind to us and from heaven assist us in our struggle with the power of darkness.\n\nAs once you rescued the Child Jesus from deadly peril, so now protect God's Holy Church from the snares of the enemy and from all adversity; shield, too, each one of us by your constant protection, so that, supported by your example and your aid, we may be able to live piously, to die in holiness, and to obtain eternal happiness in heaven. Amen.",
        note: "An ancient and highly indulgenced prayer to the foster-father of Jesus and Protector of the Universal Church."
      }
    ]
  });

  fs.writeFileSync(dataPath, JSON.stringify(prayers, null, 2));
  console.log("Catholic Treasury successfully added to prayers.json.");
} else {
  console.log("Catholic Treasury already exists.");
}
