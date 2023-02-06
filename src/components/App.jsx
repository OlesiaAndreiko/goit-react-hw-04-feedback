import { useState } from 'react';
import { Container } from './Container/Container.styled';
import { Heading } from './Heading/Heading';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Statistics } from './Statistics/Statistics';
import { Section } from './Section/Section.styled';

export const App = () => {
  const [feedbacks, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleClick = e => {
    const { name } = e.target;
    setFeedback(prev => ({ ...prev, [name]: prev[name] + 1 }));
  };

  const countTotalFeedback = () => {
    return Object.values(feedbacks).reduce((acc, el) => acc + el, 0);
  };

  const countPositiveFeedbackPercentage = () => {
    return Math.round(
      (feedbacks.good /
        Object.values(feedbacks).reduce((acc, el) => acc + el, 0)) *
        100 || 0
    );
  };

  return (
    <Container>
      <Section>
        <Heading title="Please, leave feedback!" />
        <FeedbackOptions options={feedbacks} onLeaveFeedback={handleClick} />
      </Section>
      <Section>
        <Heading title="Statistics" />
        <Statistics
          options={feedbacks}
          total={countTotalFeedback()}
          positivePercentage={countPositiveFeedbackPercentage()}
        />
      </Section>
    </Container>
  );
};
