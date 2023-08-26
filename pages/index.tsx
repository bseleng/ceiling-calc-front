import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Button, Container, Flex, Grid, Group, Space, createStyles } from '@mantine/core';
import { useAtom } from 'jotai';
import { ABaseDevURL } from '../store/AtomsAPI';
import { IChooseForms } from '../interfaces';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
  link: {
    color: 'white',
    textDecoration: 'none',
  },
  linkButton: {
    width: '100%',
  },
}));

export default function HomePage() {
  const { classes } = useStyles();
  const [baseDevPort, setBaseDevPort] = useAtom(ABaseDevURL);
  const isPort5249 = baseDevPort === '5249';
  const isPort7021 = baseDevPort === '7021';

  const getButtonStyle = (isPortChosen: boolean): string => {
    if (isPortChosen) {
      return 'filled';
    }
    return 'outline';
  };

  const getButtonVerb = (isPortChosen: boolean): IChooseForms => {
    if (isPortChosen) {
      return 'выбран';
    }
    return 'выбрать';
  };

  return (
    <Container>
      <Welcome />
      <ColorSchemeToggle />
      <Space h="md" />

      <Grid>
        <Grid.Col span={3}>
          <Group grow>
            <Flex direction="column" gap="md">
              <Button variant={getButtonStyle(isPort5249)} onClick={() => setBaseDevPort('5249')}>
                {getButtonVerb(isPort5249) + ' порт 5249'}
              </Button>
              <Button variant={getButtonStyle(isPort7021)} onClick={() => setBaseDevPort('7021')}>
                {getButtonVerb(isPort7021) + ' порт 7021'}
              </Button>
            </Flex>
          </Group>
        </Grid.Col>
        <Grid.Col span={3}>
          <Group grow>
            <Flex direction="column" gap="md">
              <Link className={classes.link} href={'/dealers'}>
                <Button color="teal" variant={'filled'} className={classes.linkButton}>
                  Дилеры
                </Button>
              </Link>
              <a
                className={classes.link}
                href={'http://localhost:' + baseDevPort + '/swagger'}
                target="_blank"
              >
                <Button color="teal" variant={'filled'} className={classes.linkButton}>
                  Swagger
                </Button>
              </a>
            </Flex>
          </Group>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
