import { Title, Text } from '@mantine/core';
import useStyles from './Welcome.styles';

export function Welcome() {
  const { classes } = useStyles();

  return (
    <>
      <Title className={classes.title} align="center" mt={100}>
        Калькулятор{' '}
        <Text inherit variant="gradient" component="span">
          Потолки
        </Text>
      </Title>
      <Text color="dimmed" align="center" size="lg" sx={{ maxWidth: 700 }} mx="auto" mt="xl">
        Приложение для управления заказами, клиентами, материлами и дилерами{' '}
      </Text>
    </>
  );
}
