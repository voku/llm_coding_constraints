import { Era, EraType } from './types';

export const TIME_MACHINE_DATA: Era[] = [
  {
    id: EraType.INTRO,
    year: "Concept",
    title: "The Wall & The Crayons",
    subtitle: "Incentives, Not Rebellion",
    content: [
      "Imagine teaching a toddler to draw. Every time they produce a recognizable shape, you praise them: 'Great job', 'Nice colors'.",
      "But you never articulate the one sentence that actually matters: 'You are not allowed to draw on the wall.'",
      "A week later, your hallway looks like a prehistoric art gallery. The child didn't rebel. The child followed incentives.",
      "You rewarded the output (drawing) and forgot to define the boundary (the paper). That is exactly how we train LLMs today.",
      "We reward helpfulness and fluency, but almost never encode: What must never change? What is forbidden?",
      "So the model generalizes. If drawing is good and nobody mentioned walls, then the wall is just a larger canvas."
    ],
    visualType: 'illustration',
    highlightPhrase: "We Optimized the Crayons and Forgot the Wall"
  },
  {
    id: EraType.IMPORTANT_REALIZATION,
    year: "Realization",
    title: "The Punchline",
    subtitle: "Scale, Data, & Missing Constraints",
    content: [
      "Before history, before code, here’s the punchline:",
      "Modern LLMs are conceptually simple. Their power — and their danger — comes from scale, data, and missing constraints.",
      "Just like parenting. Teaching rules is hard. Handing out crayons is easy."
    ],
    visualType: 'text-highlight'
  },
  {
    id: EraType.MARKOV,
    year: "1906",
    title: "Probability Before Intelligence",
    subtitle: "The Markov Chain",
    content: [
      "Long before silicon, the core idea already existed: 'Given what I’ve seen so far, what is the most likely next thing?'",
      "That’s a Markov chain. No understanding. No meaning. No intent.",
      "Just probability conditioned on context. Like a child repeating a word because they heard it last.",
      "No wall. Just imitation. Later, Claude Shannon would quantify this structure as [[SHANNON|entropy]]."
    ],
    visualType: 'diagram'
  },
  {
    id: EraType.SHANNON,
    year: "1948",
    title: "The Information Game",
    subtitle: "Claude Shannon & Entropy",
    content: [
      "Claude Shannon didn't just want to build brains; he wanted to quantify surprise.",
      "He defined the 'bit'. He proved that communication is just probability management. He even tried to use algorithms to beat the casino.",
      "He taught us that information isn't about meaning—it's about reducing uncertainty."
    ],
    visualType: 'casino',
    isSecret: true
  },
  {
    id: EraType.PERCEPTRON,
    year: "1940s–1950s",
    title: "Tiny Brains, Explicit Boundaries",
    subtitle: "The Perceptron",
    content: [
      "Early neural models were brutally honest. At their core, they were simple thresholds.",
      "No creativity. No abstraction. No crayons on the wall.",
      "Ironically, these early models had clearer boundaries than modern ones. The wall was absolute. When it failed, we entered the [[AI_WINTER|long cold silence]]."
    ],
    codeSnippet: `if (weighted_sum > threshold) {
    fire();
} else {
    // The Wall is absolute
    stay_silent();
}`,
    codeLanguage: "c",
    visualType: 'code'
  },
  {
    id: EraType.AI_WINTER,
    year: "1974",
    title: "The First Winter",
    subtitle: "Broken Promises",
    content: [
      "We promised reasoning. We delivered simple logic gates. Funding evaporated.",
      "This happens when you overpromise and under-constrain. The Perceptron had limits. We just chose to ignore them until the money ran out.",
      "The walls of reality closed in. But deep in the frozen labs, [[BACKPROP|a spark survived]]."
    ],
    visualType: 'frozen',
    isSecret: true
  },
  {
    id: EraType.BACKPROP,
    year: "1986",
    title: "The Godfather",
    subtitle: "Hinton & Backpropagation",
    content: [
      "While the world ignored AI, Geoffrey Hinton and others formalized how to blame the neurons.",
      "Backpropagation: 'You fired, but you shouldn't have. Adjust your weight.'",
      "This simple rule—learning from errors—is the engine of everything today. It turned the wall into a gradient."
    ],
    visualType: 'gradient',
    isSecret: true
  },
  {
    id: EraType.LSTM,
    year: "1990s",
    title: "Memory Appears",
    subtitle: "Context Matters",
    content: [
      "Then we realized something important: Context matters. With LSTMs, earlier inputs could influence later outputs.",
      "This is the child remembering: 'Last time I drew on the table, mom was angry.'",
      "It was a loop. A primitive form of attention, but limited in scope."
    ],
    visualType: 'diagram'
  },
  {
    id: EraType.ATTENTION,
    year: "2014",
    title: "The Rosetta Stone",
    subtitle: "Attention Mechanisms",
    content: [
      "Before Transformers took over, we tried to align languages for translation.",
      "We called it 'Attention'. It was the spark that realized: you don't need to read in order, you just need to know what to look at.",
      "Verschränkung of language. It prepared the stage for the main event."
    ],
    visualType: 'heatmap',
    isSecret: true
  },
  {
    id: EraType.TRANSFORMER,
    year: "2017",
    title: "The Transformer",
    subtitle: "The Code, Not the Myth",
    content: [
      "This is where explanations usually collapse into mysticism. Let's not do that.",
      "The transformer architecture is embarrassingly small. Just linear algebra and normalization.",
      "It stood on the shoulders of the [[ATTENTION|attention mechanism]], scaling it massively.",
      "There is no business logic module. No ethics layer. No notion of 'this is illegal'."
    ],
    codeSnippet: `# 1. Token embeddings
x = embed(tokens)

# 2. Self-attention
q = x @ Wq
k = x @ Wk
v = x @ Wv
attn = softmax(q @ k.T / sqrt(d))
x = attn @ v

# 3. Feed-forward
x = relu(x @ W1) @ W2`,
    codeLanguage: "python",
    visualType: 'code'
  },
  {
    id: EraType.GENERALIZATION,
    year: "2019",
    title: "Where the Metaphor Stops",
    subtitle: "Patterns vs. Rules",
    content: [
      "Transformers are exceptional generalizers. That is their superpower — and their flaw.",
      "If you teach a model 'Clean code is good' and 'Simplify logic', it concludes 'Simplify everything'.",
      "So it removes a redundant check. It doesn't know this check exists because of a 2019 lawsuit.",
      "We taught models patterns, not rules. Patterns scale. Rules constrain. Without constraints, patterns become [[HALLUCINATION|beautiful lies]]."
    ],
    visualType: 'warning'
  },
  {
    id: EraType.HALLUCINATION,
    year: "2023",
    title: "The Hallucination",
    subtitle: "Confidence Without Knowledge",
    content: [
      "The model is not lying. It is simply generating the most probable next token.",
      "It doesn't know the case citation is fake. It just knows that legal documents usually look like this.",
      "When you remove the walls, the crayons draw everywhere—even on reality itself."
    ],
    visualType: 'glitch',
    isSecret: true
  },
  {
    id: EraType.GIT_HISTORY,
    year: "Present",
    title: "The Wall Was Never Learned",
    subtitle: "Your Git History Is Parenting",
    content: [
      "An LLM trained on your codebase sees the final snapshot. It does not see reverted commits, production outages, or 2 a.m. Slack threads.",
      "Git is not just version control. It is a decision log. Every hotfix and revert is negative knowledge.",
      "The model only sees the snapshot. It sees the wall, but not the reason why you can't draw on it."
    ],
    codeSnippet: `// LLM sees this: "Cleanup candidate"
if ($timeout < 30) {
    $timeout = 30;
}

// Git Blame reveals:
// "Fixes critical crash (incident #492).
// Do not lower this value."`,
    codeLanguage: "php",
    visualType: 'text-highlight'
  },
  {
    id: EraType.BAD_APPROACH,
    year: "Anti-Pattern",
    title: "Rules Are Not Comments",
    subtitle: "They Are Contracts",
    content: [
      "Most teams try to fix this with comments, prompts, or 'be careful' notes. That fails.",
      "Comments are optional, unverifiable, and invisible to tools.",
      "A critical rule without executable proof is just a suggestion."
    ],
    visualType: 'list'
  },
  {
    id: EraType.SOLUTION,
    year: "Future",
    title: "Drawing the Wall Properly",
    subtitle: "Explicit Contracts",
    content: [
      "Stop relying on folklore. Name the rule. Define the intent. Attach it to code. Test it.",
      "If the test fails, the wall holds. Remove the test, the wall disappears.",
      "This is enforced memory."
    ],
    codeSnippet: `// 1. Name & Define
enum BillingRules { RefundLimit = 'REFUND_LIMIT' }

// 2. Attach
#[Rule(BillingRules::RefundLimit)]
function refund(Order $order) {
    if ($order->amount > 500) throw new ManualApproval();
}

// 3. The Concrete Wall (Test)
function testRefundLimit() {
   expectException(ManualApproval::class);
   (new Service())->refund(Order::fake(amount: 600));
}`,
    codeLanguage: "php",
    visualType: 'contract'
  },
  {
    id: EraType.MISSING_CONTEXT,
    year: "Context",
    title: "The Happy Path",
    subtitle: "Outcomes, Not Scars",
    content: [
      "We need hard constraints and explicit rules not because LLMs are weak, but because we never trained them on how our systems actually evolved. LLMs were trained on outcomes. Not on scars.",
      "An LLM trained on code sees final snapshots and cleaned-up repositories. It does not see failed refactors, reverted commits, or 'never touch this again' moments. That knowledge lives in git logs and people’s heads.",
      "We trained models like we train juniors: 'Here’s the code, don’t worry about the weird parts.' So when an LLM 'breaks' something, it’s effectively saying: 'I cleaned it up.'",
      "We don’t add constraints because AI is dangerous. We add constraints because we finally automated something that was quietly relying on human memory. The wall was always there. We just never wrote it down."
    ],
    visualType: 'illustration',
    highlightPhrase: "The Wall Was Always There"
  },
  {
    id: EraType.ACTION,
    year: "Action",
    title: "Call To Action",
    subtitle: "Start Drawing",
    content: [
      "We didn’t create a monster. We optimized the crayons and forgot the wall.",
      "Pick one critical service today and ask: What must never change here? Why does this ugly code exist? Where is that knowledge written down?",
      "If the answer is 'in people’s heads', your wall is imaginary."
    ],
    visualType: 'illustration'
  }
];