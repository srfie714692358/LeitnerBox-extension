export interface StorageLocal {
	selectedText?: string;
}

export type Message =
	| {type: "TEXT_SELECTED";}
	| { type: "TEXT_CLEARED" };
