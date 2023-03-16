export interface Product {
	id: string;
	code: string;
	desc: string;
	section?: string;
	status?: string;
	lastBuy?: Date;
	favourite?: boolean;
	urlImg?: string;
	quantity?:number;
}