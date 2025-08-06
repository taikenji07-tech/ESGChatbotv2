
import type { DecisionTree, Achievements } from './types';

export const achievements: Achievements = {
    'first_steps': { titleKey: 'ach_first_steps_title', descKey: 'ach_first_steps_desc', points: 10, icon: 'rocket' },
    'branch_complete': { titleKey: 'ach_branch_complete_title', descKey: 'ach_branch_complete_desc', points: 20, icon: 'compass' },
    'all_topics': { titleKey: 'ach_all_topics_title', descKey: 'ach_all_topics_desc', points: 50, icon: 'globe-2' },
    'quiz_master': { titleKey: 'ach_quiz_master_title', descKey: 'ach_quiz_master_desc', points: 75, icon: 'brain-circuit' },
    'streak_3': { titleKey: 'ach_streak_3_title', descKey: 'ach_streak_3_desc', points: 30, icon: 'flame' }
};

export const quizOrder = ['quiz_q1', 'quiz_q2', 'quiz_q3', 'quiz_q4', 'quiz_q5', 'quiz_q6_prompt', 'quiz_q7_prompt'];

export const progressNodes = new Set([
  'start',
  'greeting',
  'what_is_esg_answer',
  'main_loop',
  'why_important_answer',
  'more_importance_esg',
  'matter_as_student_answer',
  'insurance_link_answer',
  'what_can_i_do_answer',
  'what_else_student_prompt',
  'what_else_response',
  'how_relevant_answer',
  'career_opportunities_answer',
  'career_next_steps',
  'how_to_learn_answer',
  'degree_major_prompt',
  'degree_major_response',
  'do_i_matter_answer',
  'digital_habits_answer',
  'learning_complete_prompt_quiz'
]);

export const totalProgressSteps = progressNodes.size;

export const decisionTree: DecisionTree = {
    'start': {
        text: "start_text",
        type: 'PROMPT',
        nextNode: 'greeting',
    },
    'greeting': {
        text: "greeting_text",
        isDynamic: true,
        type: 'QUESTION',
        buttons: [ { text: "btn_what_is_esg", nextNode: 'what_is_esg_answer' } ]
    },
    'what_is_esg_answer': {
        text: "what_is_esg_answer_text",
        type: 'ANSWER',
        buttons: [ { text: "btn_what_else_esg", nextNode: 'main_loop' } ]
    },
    'main_loop': {
        text: "main_loop_text",
        type: 'LOOP_QUESTION',
        branches: {
            'why_important': { text: "btn_why_important", nextNode: 'why_important_answer' },
            'what_can_i_do': { text: "btn_what_can_i_do", nextNode: 'what_can_i_do_answer' },
            'how_relevant': { text: "btn_how_relevant", nextNode: 'how_relevant_answer' },
            'do_i_matter': { text: "btn_do_i_matter", nextNode: 'do_i_matter_answer' }
        },
        nextNode: 'learning_complete_prompt_quiz'
    },
    // Branch 1: Why Important
    'why_important_answer': {
        text: "why_important_answer_text",
        type: 'ANSWER',
        buttons: [ { text: "btn_more_on_importance", nextNode: 'more_importance_esg' } ]
    },
    'more_importance_esg': {
        text: "more_importance_esg_text",
        type: 'LOOP_QUESTION',
        parentLoop: 'main_loop',
        nextNode: 'end_branch', // This will trigger when all sub-options are explored
        branches: {
            'matter_as_student': { text: "btn_matter_as_student", nextNode: 'matter_as_student_answer' },
            'insurance_link': { text: "btn_insurance_link", nextNode: 'insurance_link_answer' }
        }
    },
    'matter_as_student_answer': {
        text: "matter_as_student_answer_text",
        type: 'ANSWER',
        buttons: [ { text: "btn_makes_sense", nextNode: 'end_secondary_branch' } ]
    },
    'insurance_link_answer': {
        text: "insurance_link_answer_text",
        type: 'ANSWER',
        buttons: [ { text: "btn_interesting_perspective", nextNode: 'end_secondary_branch' } ]
    },

    // Branch 2: What Can I Do
    'what_can_i_do_answer': {
        text: "what_can_i_do_answer_text",
        type: 'ANSWER',
        buttons: [ { text: "btn_what_else_you_can_do", nextNode: 'what_else_student_prompt' } ]
    },
    'what_else_student_prompt': {
        text: "what_else_student_prompt_text",
        type: 'PROMPT',
        isDynamic: true,
        nextNode: 'what_else_response'
    },
    'what_else_response': {
        text: "", // AI will provide this text
        type: 'ANSWER',
        isDynamic: true,
        buttons: [ { text: "btn_understood", nextNode: 'end_branch' } ]
    },

    // Branch 3: How Relevant
    'how_relevant_answer': {
        text: "how_relevant_answer_text",
        type: 'ANSWER',
        buttons: [ { text: "btn_career_opportunities", nextNode: 'career_opportunities_answer' } ]
    },
    'career_opportunities_answer': {
        text: "career_opportunities_answer_text",
        type: 'ANSWER',
        buttons: [ { text: "btn_tell_me_more", nextNode: 'career_next_steps' } ]
    },
    'career_next_steps': {
        text: "career_next_steps_text",
        type: 'LOOP_QUESTION',
        parentLoop: 'main_loop', // Belongs to main flow
        nextNode: 'end_branch',
        branches: {
            'how_to_learn': { text: "btn_how_to_learn", nextNode: 'how_to_learn_answer' },
            'degree_major': { text: "btn_what_is_your_major", nextNode: 'degree_major_prompt' }
        }
    },
    'how_to_learn_answer': {
        text: "how_to_learn_answer_text",
        type: 'ANSWER',
        buttons: [ { text: "btn_check_out", nextNode: 'end_secondary_branch_career' } ]
    },
    'degree_major_prompt': {
        text: "degree_major_prompt_text",
        type: 'PROMPT',
        isDynamic: true,
        nextNode: 'degree_major_response',
    },
    'degree_major_response': {
        text: "", // AI will provide this text
        isDynamic: true,
        type: 'ANSWER',
        buttons: [ { text: "btn_very_cool", nextNode: 'end_secondary_branch_career' } ]
    },

    // Branch 4: Do I Matter
    'do_i_matter_answer': {
        text: "do_i_matter_answer_text",
        type: 'ANSWER',
        buttons: [ { text: "btn_digital_habits", nextNode: 'digital_habits_answer' } ]
    },
    'digital_habits_answer': {
        text: "digital_habits_answer_text",
        type: 'ANSWER',
        buttons: [ { text: "btn_empowering", nextNode: 'end_branch' } ]
    },
    
    // --- REDIRECTS & ENDPOINTS ---
    'end_branch': { type: 'REDIRECT', nextNode: 'main_loop' },
    'end_secondary_branch': { type: 'REDIRECT', nextNode: 'more_importance_esg' },
    'end_secondary_branch_career': { type: 'REDIRECT', nextNode: 'career_next_steps' },
    
    // --- QUIZ SECTION ---
    'learning_complete_prompt_quiz': {
        text: "learning_complete_prompt_quiz_text",
        type: 'QUESTION',
        isDynamic: true,
        buttons: [
            { text: "btn_take_quiz", nextNode: 'quiz_q1' },
            { text: "btn_no_quiz", nextNode: 'final_thanks_no_quiz' }
        ]
    },
    'quiz_q1': {
        text: "quiz_q1_text",
        type: 'QUESTION',
        buttons: [
            { text: "btn_esg_stand_for_1", nextNode: 'quiz_q1_correct' },
            { text: "btn_esg_stand_for_2", nextNode: 'quiz_incorrect' },
            { text: "btn_esg_stand_for_3", nextNode: 'quiz_incorrect' }
        ]
    },
    'quiz_q1_correct': { text: "quiz_q1_correct_text", isCorrect: true, type: 'ANSWER', buttons: [ { text: "btn_next_question", nextNode: 'quiz_q2' } ] },
    
    'quiz_q2': {
        text: "quiz_q2_text",
        type: 'QUESTION',
        buttons: [
            { text: "btn_not_esg_career_1", nextNode: 'quiz_q2_correct' },
            { text: "btn_not_esg_career_2", nextNode: 'quiz_incorrect' },
            { text: "btn_not_esg_career_3", nextNode: 'quiz_incorrect' }
        ]
    },
    'quiz_q2_correct': { text: "quiz_q2_correct_text", isCorrect: true, type: 'ANSWER', buttons: [ { text: "btn_next_question", nextNode: 'quiz_q3' } ] },

    'quiz_q3': {
        text: "quiz_q3_text",
        type: 'QUESTION',
        buttons: [
            { text: "btn_digital_habit_1", nextNode: 'quiz_q3_correct' },
            { text: "btn_digital_habit_2", nextNode: 'quiz_incorrect' },
            { text: "btn_digital_habit_3", nextNode: 'quiz_incorrect' }
        ]
    },
    'quiz_q3_correct': { text: "quiz_q3_correct_text", isCorrect: true, type: 'ANSWER', buttons: [ { text: "btn_next_question", nextNode: 'quiz_q4' } ] },

    'quiz_q4': {
        text: "quiz_q4_text",
        type: 'QUESTION',
        buttons: [
            { text: "btn_governance_action_1", nextNode: 'quiz_incorrect' },
            { text: "btn_governance_action_2", nextNode: 'quiz_q4_correct' },
            { text: "btn_governance_action_3", nextNode: 'quiz_incorrect' }
        ]
    },
    'quiz_q4_correct': { text: "quiz_q4_correct_text", isCorrect: true, type: 'ANSWER', buttons: [ { text: "btn_next_question", nextNode: 'quiz_q5' } ] },

    'quiz_q5': {
        text: "quiz_q5_text",
        type: 'QUESTION',
        buttons: [
            { text: "btn_ripple_effect_1", nextNode: 'quiz_incorrect' },
            { text: "btn_ripple_effect_2", nextNode: 'quiz_q5_correct' },
            { text: "btn_ripple_effect_3", nextNode: 'quiz_incorrect' }
        ]
    },
    'quiz_q5_correct': { text: "quiz_q5_correct_text", isCorrect: true, type: 'ANSWER', buttons: [ { text: "btn_final_question", nextNode: 'quiz_q6_prompt' } ] },

    'quiz_q6_prompt': {
        text: "quiz_q6_prompt_text",
        type: 'PROMPT',
        isDynamic: true,
        nextNode: 'quiz_q6_response'
    },
    'quiz_q6_response': {
        text: "", // AI will provide this text
        type: 'ANSWER',
        isDynamic: true,
        buttons: [ { text: "btn_final_question", nextNode: 'quiz_q7_prompt' } ]
    },

    'quiz_q7_prompt': {
        text: "quiz_q7_prompt_text",
        type: 'PROMPT',
        isDynamic: true,
        nextNode: 'quiz_q7_response'
    },
    'quiz_q7_response': {
        text: "", // AI will provide this text
        type: 'ANSWER',
        isDynamic: true,
        buttons: [ { text: "btn_see_results", nextNode: 'quiz_end' } ]
    },
    
    'quiz_incorrect': { text: "quiz_incorrect_text", isCorrect: false, type: 'ANSWER', buttons: [ { text: "btn_continue", nextNode: 'determine_next_quiz_q' } ] },
    'determine_next_quiz_q': { type: 'REDIRECT_QUIZ' },
    
    'quiz_end': {
        text: "quiz_end_text",
        type: 'ANSWER',
        isDynamic: true,
        buttons: [ 
            { text: "btn_claim_certificate", nextNode: 'show_certificate_action', type: 'show_certificate' },
            { text: "btn_start_over", nextNode: 'start' } 
        ]
    },
    'final_thanks_no_quiz': { 
        text: "final_thanks_no_quiz_text",
        isDynamic: true,
        type: 'ANSWER', 
        buttons: [ 
            { text: "btn_share_score", nextNode: 'share_action', type: 'share_linkedin' },
            { text: "btn_start_over", nextNode: 'start' } 
        ] 
    }
};
