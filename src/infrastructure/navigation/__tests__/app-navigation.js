import faker from 'faker'
import {fireEvent, appRender } from '../../../test/test-utils';
import { TabNavigator } from "../app-navigation";
import { useCart } from "../../../context/cart.context";
import {useAuth} from '../../../context/auth.context'

jest.mock('../../../context/cart.context')
jest.mock('../../../context/auth.context')

describe('testing restaurants stack navigation', () => {
    useCart.mockReturnValue({
        cart: []
    })
    useAuth.mockReturnValue({
        signOut: jest.fn(),
        user: {
            email: faker.internet.email(),
            uid: faker.datatype.uuid()
        }
     })

    test('screen contains restaurants linking to restaurant details screen', async() => {
      
        const {getByTestId, getByA11yLabel} = appRender(TabNavigator)
        expect(getByTestId(/restaurants screen/i)).not.toBeNull()

        fireEvent(getByA11yLabel(/map, tab, 2 of 4/i), 'press')
        expect(getByTestId(/map screen/i)).not.toBeNull()

        fireEvent(getByA11yLabel(/checkout, tab, 3 of 4/i), 'press')
        expect(getByTestId(/checkout screen/i)).not.toBeNull()

        fireEvent(getByA11yLabel(/settings, tab, 4 of 4/i), 'press')
        expect(getByTestId(/settings screen/i)).not.toBeNull()

        fireEvent(getByA11yLabel(/restaurants, tab, 1 of 4/i), 'press')
        expect(getByTestId(/restaurants screen/i)).not.toBeNull()
    })
    
})

