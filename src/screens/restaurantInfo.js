import * as React from 'react'
import {List} from 'react-native-paper'

import {RestaurantRow} from '../components/restaurant-row'
import {SafeArea} from '../components/lib'
import {Ionicons} from '@expo/vector-icons'
import {ScrollView} from 'react-native-gesture-handler'

function RestaurantInfoScreen({route}) {
  const {restaurant} = route.params
  return (
    <SafeArea>
      <RestaurantRow restaurant={restaurant} />
      <ScrollView>
        <List.Section title="Menu">
          <List.Accordion
            title="Breakfast"
            left={props => <List.Icon {...props} icon="coffee" />}
          >
            <List.Item title="egg" />
            <List.Item title="pancake" />
            <List.Item title="sausage" />
          </List.Accordion>
          <List.Accordion
            title="Launch"
            left={props => <List.Icon {...props} icon="food-fork-drink" />}
          >
            <List.Item title="rice" />
            <List.Item title="kabob" />
            <List.Item title="tachin" />
          </List.Accordion>
          <List.Accordion
            title="Dinner"
            left={props => <List.Icon {...props} icon="food" />}
          >
            <List.Item title="burgur" />
            <List.Item title="pizza" />
            <List.Item title="sandwich" />
          </List.Accordion>
          <List.Accordion
            title="Drink"
            left={props => <List.Icon {...props} icon="glass-cocktail" />}
          >
            <List.Item title="coke" />
            <List.Item title="bear" />
            <List.Item title="whisky" />
          </List.Accordion>
        </List.Section>
      </ScrollView>
    </SafeArea>
  )
}

export {RestaurantInfoScreen}
