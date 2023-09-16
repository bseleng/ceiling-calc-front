import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Button, Container, Flex, Grid, Group, Space, createStyles } from '@mantine/core';
import { useAtom } from 'jotai';
import { ABaseDevPort } from '../store/AtomsAPI';
import { IBaseDevPort, IChooseForms, IProtocol } from '../interfaces';
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
  const [baseDevPort, setBaseDevPort] = useAtom(ABaseDevPort);
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

  const getProtocol = (baseDevPort: IBaseDevPort): IProtocol => {
    if (baseDevPort === '5249') {
      return 'http';
    }
    return 'https';
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
              <Button variant={getButtonStyle(isPort7021)} onClick={() => setBaseDevPort('7021')}>
                {getButtonVerb(isPort7021) + ' порт 7021'}
              </Button>
              <Button variant={getButtonStyle(isPort5249)} onClick={() => setBaseDevPort('5249')}>
                {getButtonVerb(isPort7021) + ' порт 5249'}
              </Button>
              <Button
                component="a"
                target="_blank"
                href={getProtocol(baseDevPort) + '://localhost:' + baseDevPort + '/swagger'}
                color="blue"
                variant={'filled'}
              >
                Swagger
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
            </Flex>
          </Group>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
