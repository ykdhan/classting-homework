export type DataType = {
    question?: string;
    correct_answer?: string;
    incorrect_answers?: string[];
}

export type PageQuizProps = {
    max?: number;
}