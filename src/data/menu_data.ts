

// import demo_img_1 from "../../public/assets/img/header/home-1.jpg";
// import demo_img_2 from "../../public/assets/img/header/home-2.jpg";
// import demo_img_3 from "../../public/assets/img/header/home-3.jpg";
// import demo_img_4 from "../../public/assets/img/header/home-4.jpg";
// import demo_img_5 from "../../public/assets/img/header/home-5.jpg";
// // import demo_img_6 from "../../public/assets/img/header/home-6.jpg";



interface DataType {
	id: number;
	title?: string;
	link: string;
	icon: string;
	img_dropdown?: boolean;
	has_dropdown?: boolean;
	has_dropdown_inner?: boolean;
	sub_menus?: {
		link?: string;
		title?: string;
		title2?: string | any;
		btn_title?: string;
		one_page_link?: string | any;
		one_page_title?: string;
		demo_img?: string | any;
		inner_menu?: boolean;
		inner_menus?: {
			link?: string; title?: string
		}[];
	}[];
}

// menu data
const menu_data: DataType[] = [
	{
		id: 1,
		title: "Home",
		link: "/",
		icon: "fas fa-home-lg",
		img_dropdown: false,
		sub_menus: [
			// { link: "/", demo_img: demo_img_1, title: "Education", title2: "Education" },
			// { link: "/home-2", demo_img: demo_img_2, title: "Online Course", title2: "Online Course" },
			// { link: "/home-3", demo_img: demo_img_3, title: "University", title2: "University" },
			// { link: "/home-4", demo_img: demo_img_4, title: "Kindergarten", title2: "Kindergarten" },
			// { link: "/home-5", demo_img: demo_img_5, title: "Business Coach", title2: "Business Coach" },
			// { link: "#", demo_img: demo_img_6, title2: "Coming Soon" },
			// { link: "#", demo_img: demo_img_6, title2: "Coming Soon" },
			// { link: "#", demo_img: demo_img_6, title2: "Coming Soon" },
		],
	},
	{
		id: 2,
		title: "Courses",
		link: "/courses",
		icon: "fas fa-book",
		has_dropdown: false,
		sub_menus: [
			{ link: "/courses", title: "Courses" },
			{ link: "/courses-details", title: "Courses Details 01" },
		],
	},

	{
		id: 5,
		title: "Pages",
		link: "#",
		icon: "fas fa-file-alt",
		has_dropdown: false,
		has_dropdown_inner: false,
		sub_menus: [
			{ link: "/about", title: "About" },
			{ link: "/instructor", title: "Instructor" },
			{ link: "/instructor-details", title: "Instructor Details" },
			{ link: "/program", title: "Program" },
			{ link: "/program-details", title: "Program Details" },
			{
				inner_menu: true,
				title: "Blog",
				inner_menus: [
					{ link: "/news", title: "Blog" },
					{ link: "/news-details", title: "Blog Details" },
				]
			},
			{ link: "/gallery", title: "Gallery" },
			{ link: "/pricing", title: "Pricing Plan" },
			{ link: "/faq", title: "Faqs" },
			{ link: "/sign-in", title: "Sign In" },
			{ link: "/register", title: "register" },
			{ link: "/404", title: "404 Error" },
		],
	},
	{
		id: 6,
		title: "Dashboard",
		link: "/dashboard",
		icon: "fas fa-phone-rotary",
		has_dropdown: false,
	},
];
export default menu_data;
