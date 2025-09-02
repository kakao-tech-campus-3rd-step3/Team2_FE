import { Button, HStack } from '@chakra-ui/react'
import styled from '@emotion/styled';

import { ColorModeButton } from '@/components/ui/color-mode'

const Test = styled.div`
    width: 100px;
    height: 100px;
    background-color:red;
`

function Home() {

    return (
        <>
            <HStack>
                <Button>Click me</Button>
                <Button>Click me</Button>
                {/* <Test></Test> */}
                <ColorModeButton></ColorModeButton>
            </HStack>
        </>

    )
}

export default Home;