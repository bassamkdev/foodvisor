import * as React from 'react';
import { render, waitFor} from "../../test/test-utils";
import { View, Text  } from "react-native";
import { FadeInView } from "../animation";

jest.mock('../../context/favourites.context')


test('should set the content opacity to 0 at the begining and the to 1 after duration time', async() => {
     const {getByTestId, getByText} = render(
        <FadeInView duration={1}>
            <View>
                <Text>test</Text>
            </View>
        </FadeInView>
    )
        expect(getByTestId(/fadeAnim/i)).toHaveStyle({opacity: 0})
        await waitFor(() => expect(getByTestId(/fadeAnim/i)).toHaveStyle({opacity: 1}))
        expect(getByText(/test/i)).not.toBeNull()
})
