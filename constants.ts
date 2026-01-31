
import { Language, QuizQuestion, LessonUnit, UserStats } from './types';

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
];

export const MOCK_LESSONS: Record<string, LessonUnit[]> = {
  en: [
    {
      id: 'en_u1',
      title: 'Unit 1: Foundations',
      lessons: [
        { 
          id: 'en_l1', 
          title: 'Essential Greetings', 
          description: 'Formal and informal ways to say hello.', 
          content: 'In English, "Hello" is the universal greeting. Use "Good morning" before noon, "Good afternoon" until 5 PM, and "Good evening" after. "Hi" or "Hey" are great for friends!',
          questions: [
            { question: 'What is the most common informal greeting?', options: ['Good morning', 'Hello', 'Hi'], correctAnswer: 2, explanation: '"Hi" is the standard informal greeting.' },
            { question: 'When is "Good evening" appropriate?', options: ['At 8 AM', 'At 2 PM', 'At 7 PM'], correctAnswer: 2, explanation: '"Evening" refers to the period after the sun starts setting.' }
          ]
        },
        { 
          id: 'en_l2', 
          title: 'The Verb "To Be"', 
          description: 'I am, You are, He is.', 
          content: 'The verb "to be" is the most important verb. \nI am (I\'m)\nYou are (You\'re)\nHe/She/It is (He\'s/She\'s/It\'s)\nWe are (We\'re)\nThey are (They\'re)',
          questions: [
            { question: 'Complete the sentence: "She ___ a doctor."', options: ['am', 'is', 'are'], correctAnswer: 1, explanation: 'Third person singular "She" takes "is".' }
          ]
        }
      ]
    }
  ],
  hi: [
    {
      id: 'hi_u1',
      title: 'Unit 1: The Basics',
      lessons: [
        { 
          id: 'hi_l1', 
          title: 'Hindi Vowels (Swar)', 
          description: 'The building blocks of the language.', 
          content: 'Hindi uses the Devanagari script. The first few vowels are: \nअ (a) - as in "up"\nआ (aa) - as in "car"\nइ (i) - as in "it"\nई (ee) - as in "feet"',
          questions: [
            { question: 'Which character represents the long "ee" sound?', options: ['अ', 'इ', 'ई'], correctAnswer: 2, explanation: 'ई represents the long "ee" sound.' }
          ]
        },
        { 
          id: 'hi_l2', 
          title: 'Polite Greetings', 
          description: 'Namaste and more.', 
          content: '"Namaste" (नमस्ते) is the most respectful way to greet anyone. You can also use "Suprabhat" (सुप्रभात) for "Good Morning". To say thank you, use "Shukriya" (शुक्रिया) or "Dhanyavad" (धन्यवाद).',
          questions: [
            { question: 'What is the formal word for "Thank you"?', options: ['Namaste', 'Dhanyavad', 'Suprabhat'], correctAnswer: 1, explanation: '"Dhanyavad" is a formal Sanskrit-based word for "Thank you".' }
          ]
        }
      ]
    }
  ],
  es: [
    {
      id: 'es_u1',
      title: 'Unidad 1: Empezando',
      lessons: [
        { 
          id: 'es_l1', 
          title: 'Saludos y Despedidas', 
          description: 'Hello, goodbye, and more.', 
          content: 'Greetings: "¡Hola!" (Hello), "Buenos días" (Good morning), "Buenas tardes" (Good afternoon), "Buenas noches" (Good evening).\nFarewells: "Adiós" (Goodbye), "Hasta luego" (See you later).',
          questions: [
            { question: 'How do you say "Good Afternoon"?', options: ['Buenas noches', 'Buenas tardes', 'Buenos días'], correctAnswer: 1, explanation: '"Tardes" refers to the afternoon.' },
            { question: 'What does "Hasta luego" mean?', options: ['Hello', 'See you later', 'Good night'], correctAnswer: 1, explanation: '"Hasta" means until, "luego" means later.' }
          ]
        },
        { 
          id: 'es_l2', 
          title: 'Personal Pronouns', 
          description: 'Yo, Tú, Él...', 
          content: 'Yo (I)\nTú (You - informal)\nUsted (You - formal)\nÉl/Ella (He/She)\nNosotros (We)\nEllos/Ellas (They)',
          questions: [
            { question: 'Which pronoun is used for "We"?', options: ['Ellos', 'Nosotros', 'Usted'], correctAnswer: 1, explanation: 'Nosotros is the plural "We".' }
          ]
        }
      ]
    }
  ],
  fr: [
    {
      id: 'fr_u1',
      title: 'Unité 1: Les Bases',
      lessons: [
        { 
          id: 'fr_l1', 
          title: 'Salutations de base', 
          description: 'Greetings in French.', 
          content: '"Bonjour" is the most common greeting. "Salut" is for friends. "Comment ça va ?" means "How is it going?". To answer, say "Ça va bien, merci !"',
          questions: [
            { question: 'What is the informal way to say "Hi"?', options: ['Bonjour', 'Salut', 'Merci'], correctAnswer: 1, explanation: '"Salut" is used among friends and peers.' }
          ]
        },
        { 
          id: 'fr_l2', 
          title: 'Nouns & Genders', 
          description: 'Masculine vs Feminine.', 
          content: 'In French, all nouns have a gender. \nMasculine: Un livre (a book), Le garçon (the boy).\nFeminine: Une pomme (an apple), La fille (the girl).',
          questions: [
            { question: 'Which article is feminine singular?', options: ['Le', 'Les', 'La'], correctAnswer: 2, explanation: '"La" is the definite feminine singular article.' }
          ]
        }
      ]
    }
  ],
  de: [
    {
      id: 'de_u1',
      title: 'Einheit 1: Erste Schritte',
      lessons: [
        { 
          id: 'de_l1', 
          title: 'Begrüßung', 
          description: 'German greetings.', 
          content: '"Hallo" is universal. "Guten Tag" (Good day) is slightly more formal. In the South (Bavaria), people say "Grüß Gott!".',
          questions: [
            { question: 'What does "Guten Tag" mean?', options: ['Good morning', 'Good day', 'Goodbye'], correctAnswer: 1, explanation: '"Tag" is the German word for day.' }
          ]
        },
        { 
          id: 'de_l2', 
          title: 'The Three Genders', 
          description: 'Der, Die, Das.', 
          content: 'German has three grammatical genders: \nDer (Masculine) - der Hund\nDie (Feminine) - die Katze\nDas (Neuter) - das Haus',
          questions: [
            { question: 'Which article is used for Neuter nouns?', options: ['Der', 'Das', 'Die'], correctAnswer: 1, explanation: '"Das" is the neuter definite article.' }
          ]
        }
      ]
    }
  ]
};

export const MOCK_QUIZ_QUESTIONS: Record<string, QuizQuestion[]> = {
  en: [
    {
      id: 'en1',
      question: 'Which of these is a synonym for "Enthusiastic"?',
      options: ['Bored', 'Eager', 'Calm', 'Tired'],
      correctAnswer: 1,
      explanation: '"Eager" means showing keen interest or enthusiasm.'
    },
    {
      id: 'en2',
      question: 'Select the correctly spelled word:',
      options: ['Accomodate', 'Acommodate', 'Accommodate', 'Acomodate'],
      correctAnswer: 2,
      explanation: '"Accommodate" is spelled with two \'c\'s and two \'m\'s.'
    }
  ],
  hi: [
    {
      id: 'hi1',
      question: 'How do you say "Hello" in Hindi?',
      options: ['Namaste', 'Shukriya', 'Alvida', 'Suprabhat'],
      correctAnswer: 0,
      explanation: '"Namaste" is the most common respectful greeting in Hindi.'
    },
    {
      id: 'hi2',
      question: 'What is the Hindi word for "Water"?',
      options: ['Hawa', 'Paani', 'Khana', 'Makan'],
      correctAnswer: 1,
      explanation: '"Paani" (पानी) means water.'
    }
  ],
  es: [
    {
      id: 'es1',
      question: 'How do you say "Thank you" in Spanish?',
      options: ['Hola', 'Por favor', 'Gracias', 'De nada'],
      correctAnswer: 2,
      explanation: '"Gracias" means thank you.'
    },
    {
      id: 'es2',
      question: 'Translate "The red table" to Spanish.',
      options: ['El mesa rojo', 'La mesa roja', 'La mesa rojo', 'El mesa roja'],
      correctAnswer: 1,
      explanation: 'Table (Mesa) is feminine, so it uses "La" and "roja".'
    }
  ],
  fr: [
    {
      id: 'fr1',
      question: 'Translate "The red apple" to French.',
      options: ['La pomme rouge', 'Le pomme rouge', 'La rouge pomme', 'L\'apple rouge'],
      correctAnswer: 0,
      explanation: 'In French, adjectives like "rouge" usually follow the noun "pomme".'
    },
    {
      id: 'fr2',
      question: 'How do you say "Please" in French?',
      options: ['Merci', 'De rien', 'S\'il vous plaît', 'Bonjour'],
      correctAnswer: 2,
      explanation: '"S\'il vous plaît" is the formal way to say please.'
    }
  ],
  de: [
    {
      id: 'de1',
      question: 'How do you say "Thank you" in German?',
      options: ['Bitte', 'Danke', 'Hallo', 'Tschüss'],
      correctAnswer: 1,
      explanation: '"Danke" is the standard way to say thank you.'
    },
    {
      id: 'de2',
      question: 'What is the plural of "Das Buch" (The book)?',
      options: ['Die Bücher', 'Der Buchs', 'Das Buches', 'Die Buch'],
      correctAnswer: 0,
      explanation: 'The plural of "Buch" is "Bücher", and it takes the plural article "die".'
    }
  ]
};

export const INITIAL_STATS: UserStats = {
  sessionsCompleted: 12,
  accuracy: 85,
  wordsLearned: 450,
  streak: 5,
  confidence: 45,
  level: 'Improving' as const,
  mistakesHistory: []
};
