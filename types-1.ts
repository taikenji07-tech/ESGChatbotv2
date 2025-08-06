export type NodeId = string;
export type Language = 'en' | 'ms';

export interface Button {
    text: string;
    nextNode: NodeId;
    branchKey?: string;
    type?: 'link' | 'show_certificate' | 'share_linkedin';
}

export interface Branch {
    text: string;
    nextNode: NodeId;
}

interface BaseNode {
    text: string; // This will now be a translation key
    nextNode?: NodeId;
    isDynamic?: boolean;
    isCorrect?: boolean;
    achievementId?: string;
}

export interface QuestionNode extends BaseNode {
    type: 'QUESTION';
    buttons: Button[];
}

export interface AnswerNode extends BaseNode {
    type: 'ANSWER';
    buttons?: Button[];
}

export interface LoopQuestionNode extends BaseNode {
    type: 'LOOP_QUESTION';
    branches: Record<string, Branch>;
    nextNode: NodeId;
    parentLoop?: NodeId;
}

export interface PromptNode extends BaseNode {
    type: 'PROMPT';
    nextNode: NodeId;
}

export interface RedirectNode {
    type: 'REDIRECT';
    nextNode: NodeId;
}

export interface RedirectQuizNode {
    type: 'REDIRECT_QUIZ';
}

export type Node = QuestionNode | AnswerNode | LoopQuestionNode | PromptNode | RedirectNode | RedirectQuizNode;

export type DecisionTree = Record<NodeId, Node>;

export interface Message {
    id: number;
    sender: 'user' | 'bot';
    text: string;
    buttons?: Button[];
}

// Gamification Types
export interface Achievement {
    titleKey: string;
    descKey: string;
    points: number;
    icon: string;
}

export type Achievements = Record<string, Achievement>;

export interface GameState {
    score: number;
    streak: number;
    achievements: Set<string>;
    quizCorrectAnswers: number;
    userName: string;
    major: string;
    lastQuestionId: string;
    visitedProgressNodes: Set<string>;
    quizCompleted: boolean;
}