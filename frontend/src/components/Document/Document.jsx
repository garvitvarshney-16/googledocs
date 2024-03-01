import React, { useState } from 'react'
import { IconButton } from '@material-tailwind/react'
import {
    Button,
    Dialog,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
} from "@material-tailwind/react";



const Document = () => {

    const [open, setOpen] = React.useState(false);
    const [input, setInput] = useState("")
    const handleOpen = () => setOpen((cur) => !cur);


    const createDocument = () => {
        if (!input) {
            return
        }
        setInput("")
        setOpen(false)
    };

    const Modal = (
        <Dialog
            size="xs"
            open={open}
            handler={handleOpen}
            className="bg-transparent shadow-none"
        >
            <Card className="mx-auto w-full max-w-[24rem]">
                <CardBody className="flex flex-col gap-4">
                    <Input label="Enter name of document" value={input} onChange={(e) => setInput(e.target.value)} type='text' size="lg" onKeyDown={(e) => e.key === "Enter"  && createDocument()} />
                </CardBody>
                <CardFooter className="pt-0">
                    <Button variant="gradient" onClick={createDocument} fullWidth color='blue'>
                        Create
                    </Button>
                </CardFooter>
                <CardFooter className="pt-0">
                    <Button variant="gradient" onClick={handleOpen} fullWidth color='blue'>
                        Cancel
                    </Button>
                </CardFooter>
            </Card>
        </Dialog>
    )
    return (
        <div>
            {Modal}
            <section className='bg-[#F8F9FA] pb-2 px-10'>
                <div className='max-w-3xl mx-auto'>
                    <div className='flex items-center justify-between py-6'>
                        <h2 className='text-gray-700 text-lg'>Start a new document</h2>

                        <IconButton color='gray' variant='text' size='md'>
                            <img src="/more_vert.png" alt="" />
                        </IconButton>
                    </div>

                    <div onClick={handleOpen}>
                        <div className='relative h-52 w-40 border-2 cursor-pointer hover:border-blue-700'>
                            <img src="https://links.papareact.com/pju" alt="fill" />
                        </div>
                        <p className='ml-2 mt-2 font-semibold text-sm text-gray-700'>Blank</p>
                    </div>
                </div>
            </section>

            <section className='bg-white px-10 md:px-0'>
                <div className='max-w-3xl mx-auto py-8 text-sm text-gray-700'>
                    <div className='flex items-center justify-between pb-5'>
                        <h2 className='font-medium flex-grow'>My Documents</h2>
                        <p className='mr-12'>Date Created</p>
                        <IconButton color='gray' variant='text' size='lg'>
                            <i class="fa-solid fa-folder"></i>
                        </IconButton>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Document