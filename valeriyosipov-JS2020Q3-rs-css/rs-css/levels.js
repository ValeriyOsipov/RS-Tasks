export const levels = [
  {
    task: 'Select all boxes',
    description: 'You can use all selectors. For this task select elements by their tag or even using universal selector!',
    short: 'First easy task',
    markup: `<box></box>
    <box class="round"></box>
    <box></box>`,
    answer: 'box',
  },
  {
    task: 'Select round box',
    description: 'Its simple. Select element by class. Or try some pseudoclasses magic.',
    short: 'Last easy task',
    markup: `<box></box>
    <box class="round"></box>
    <box></box>`,
    answer: '.round',
  },
  {
    task: 'Select all non-round boxes',
    description: 'Use force! I mean pseudoclasses.',
    short: "Let's start real tasks",
    markup: `<box></box>
    <box class="round"></box>
    <box></box>`,
    answer: 'box:not(.round)',
  },
  {
    task: 'Select round box and last box',
    description: 'This task also has more than one solutions.',
    short: 'More pseudoclasses',
    markup: `<box></box>
    <box class="round"></box>
    <box></box>`,
    answer: ':nth-child(n+2)',
  },
  {
    task: 'Same! Select last box and round box',
    description: 'Can you get right formula now? Or just combine selectors.',
    short: 'Now a little harder',
    markup: `<box></box>
    <box class="round"></box>
    <box></box>
    <box></box>
    <box></box>`,
    answer: ':last-child, .round',
  },
  {
    task: 'Select first candy',
    description: "Let's go deeper.",
    short: 'Candies',
    markup: `<box><candy></candy></box>
    <box><candy class="red"></candy></box>`,
    answer: ':first-child candy',
  },
  {
    task: 'Select candies in round boxes',
    description: "Don't forget about simple selectors.",
    short: 'More candies',
    markup: `<box></box>
    <box class="round"><candy></candy></box>
    <box class="round"></box>
    <box><candy></candy></box>
    <box class="round"><candy class="red"></candy></box>`,
    answer: '.round candy',
  },
  {
    task: 'Select empty boxes',
    description: 'But where is candies?',
    short: 'Defect',
    markup: `<box></box>
    <box class="round"><candy></candy></box>
    <box class="round"></box>
    <box><candy></candy></box>
    <box class="round"><candy class="red"></candy></box>`,
    answer: 'box:empty',
  },
  {
    task: 'Select candies outside boxes',
    description: 'Select scattered candies.',
    short: 'Oops',
    markup: `<box></box>
    <candy class="red"></candy>
    <box class="round"><candy></candy></box>
    <candy></candy>`,
    answer: '> candy',
  },
  {
    task: 'Select all boxes with candies',
    description: 'Try to select completed gifts.',
    short: 'Completed gifts',
    markup: `<box></box>
    <box class="round"><candy></candy></box>
    <box class="round"></box>
    <box><candy></candy></box>
    <box class="round"><candy class="red"></candy></box>`,
    answer: ':not(:empty)',
  },
  {
    task: 'Select round boxes with candies',
    description: 'Now select only completed round gifts.',
    short: 'Completed round gifts',
    markup: `<box><candy class="red"></candy></box>
    <box class="round"><candy></candy></box>
    <box class="round"><candy class="red"></candy></box>
    <box class="round"></box>
    <box class="round"><candy></candy></box>`,
    answer: ':not(:empty).round',
  },
  {
    task: 'Select round box with red candy',
    description: 'A simple task for a break.',
    short: 'Little break',
    markup: `<box><candy class="red"></candy></box>
    <box class="round"><candy></candy></box>
    <box class="round"></box>
    <box class="round"><candy class="red"></candy></box>
    <box class="round"><candy></candy></box>`,
    answer: ':nth-child(4)',
  },
  {
    task: 'Select all sweets in round boxes',
    description: 'Now with chocolate.',
    short: 'Choco',
    markup: `<box><candy class="red"></candy></box>
    <box class="round"><choco></choco></box>
    <box class="round"></box>
    <box class="round"><candy class="red"></candy></box>
    <box class="round"><candy></candy></box>`,
    answer: '.round :first-child',
  },
  {
    task: "Select every choko that's next to empty boxes",
    description: 'You know how to find empty boxes. Now just find next items.',
    short: 'Repackage',
    markup: `<box></box>
    <choco></choco>
    <box class="round"></box>
    <choco></choco>
    <box class="round"><choco></choco></box>
    <choco></choco>`,
    answer: 'box:empty + choco',
  },
  {
    task: 'Select all boxes with choco and red candies',
    description: 'Filter completed gifts.',
    short: 'Filter completed gifts',
    markup: `<box><candy></candy></box>
    <box class="round"><choco></choco></box>
    <box><choco></choco></box>
    <box class="round"><candy class="red"></candy></box>
    <box class="round"><candy></candy></box>`,
    answer: 'box:not(:first-child):not(:last-child)',
  },
  {
    task: 'Select every choko in big boxes',
    description: 'More sweets in boxes.',
    short: 'Big boxes',
    markup: `<box><candy></candy><choco></choco></box>
    <box><choco></choco></box>
    <box class="round"><candy></candy></box>
    <box><candy></candy><choco></choco></box>`,
    answer: 'choco:nth-child(2)',
  },
  {
    task: 'Same! Select every choko in big boxes',
    description: 'Not so easy this time?',
    short: 'More choco in big boxes',
    markup: `<box><candy></candy><choco></choco></box>
    <box><choco></choco></box>
    <box class="round"><candy></candy></box>
    <box><choco></choco><choco></choco></box>`,
    answer: 'choco:not(:only-child)',
  },
  {
    task: 'Select every last sweet in big boxes',
    description: 'Not so difficult? Do you feel the power?',
    short: 'Search in big boxes',
    markup: `<box><candy></candy><choco></choco></box>
    <box><choco></choco></box>
    <box><choco></choco><candy class="red"></candy></box>
    <box><choco></choco><candy></candy></box>`,
    answer: 'box :nth-child(2)',
  },
  {
    task: 'Select animated elements',
    description: 'No hints this time.',
    short: 'Monster level 1',
    markup: `<box class="round"></box>
    <box><choco></choco></box>
    <box><choco></choco><candy class="red"></candy></box>
    <candy></candy>
    <box class="round"><choco></choco></box>`,
    answer: ':first-of-type',
  },
  {
    task: 'Select animated elements',
    description: 'No hints this time.',
    short: 'Monster level 2',
    markup: `<box><choco></choco><choco></choco></box>
    <box class="round"></box>
    <box><choco></choco><candy class="red"></candy></box>
    <choco></choco>
    <box><choco></choco></box>`,
    answer: ':only-of-type',
  },
  {
    task: 'Select animated elements',
    description: 'No hints this time.',
    short: 'Monster level 3',
    markup: `<box class="round"></box>
    <box><choco></choco></box>
    <box><choco></choco><candy class="red"></candy></box>
    <candy></candy>
    <box class="round"><choco></choco></box>`,
    answer: ':nth-child(2n+2)',
  },
];
