import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    IconButton,
} from "@material-tailwind/react";
import {
    StarIcon,
    HeartIcon,
} from "@heroicons/react/24/solid";
import {Link} from "react-router-dom";
import {ButtonMetamask} from "../../../services/Metamask/Metamask";

export function CardToken(props) {
    return (
        <Card
            className="w-95 max-w-[26rem] shadow-lg dark:bg-stone-800 dark:text-stone-100 bg-stone-200 text-stone-950">
            <CardHeader floated={false} color="blue-gray">
                <img
                    src="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    alt="ui/ux review check"
                />
                <div
                    className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 "/>
                <IconButton
                    size="sm"
                    color="red"
                    variant="text"
                    className="!absolute top-4 right-4 rounded-full"
                >
                    <HeartIcon className="h-6 w-6"/>
                </IconButton>
            </CardHeader>
            <CardBody>
                <div className="mb-3 flex items-center justify-between">
                    <Typography variant="h5" className="font-medium text-stone-950 dark:text-stone-100">
                        {props.name}
                    </Typography>
                    <Typography
                        color="blue-gray"
                        className="flex items-center gap-1.5 font-normal"
                    >
                        <StarIcon className="-mt-0.5 h-5 w-5 text-yellow-700"/>
                        5.0
                    </Typography>
                </div>
                <Typography className="text-stone-950 dark:text-stone-100">
                    Enter a freshly updated and thoughtfully furnished peaceful home
                    surrounded by ancient trees, stone walls, and open meadows.
                </Typography>
            </CardBody>
            <CardFooter className="pt-3">
                <Button className={"dark:bg-stone-600 dark:hover:bg-stone-650 bg-stone-200 hover:bg-stone-350"} size="lg" fullWidth={true} onClick={() => {window.location.replace('/products')}}>
                    Reserve
                </Button>
                <Button size="lg" fullWidth={true} onClick={() => {window.location.replace(`/product/` + props.id)}}>
                    Detail
                </Button>
            </CardFooter>
        </Card>
    );
}