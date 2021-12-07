import React, { Component } from 'react';

import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  Picker,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { styles, results } from './styles';
import Header from '~/components/Header';
import api from '~/services/api';
import { colors } from '~/styles';

export default class Professionals extends Component {
  static navigationOptions = {
    drawerIcon: ({ tintColor }) => (
      <Icon name="vcard-o" size={21} color={tintColor} />
    ),
  };

  state = {
    botaoPressionado: false,
    data: null,
    busca: '',
    loading: false,
    especialidadeId: 0,
    especialidadeItens: [{ nome: 'Todos' }],
    habilitacaoId: 0,
    habilitacaoItens: [{ nome: 'Todos' }],
    municipioId: 0,
    municipioItens: [{ nome: 'Todos' }],
    nome: '',
    resultados: [],
    icones: [],
  };

  aplicarFiltro = (data) => {
    const { especialidadeId, habilitacaoId, municipioId } = this.state;
    const aux = [];
    data.forEach((i) => {
      if (this.state.nome === '' || i.nome.includes(this.state.nome)) {
        if (
          especialidadeId === 0
          || String(i.especialidades.map(i => i.id)).includes(
            String(especialidadeId),
          )
        ) {
          if (
            habilitacaoId === 0
            || String(i.habilitacoes.map(i => i.id)).includes(
              String(habilitacaoId),
            )
          ) {
            if (municipioId === 0 || municipioId === i.municipio.id) {
              aux.push(i);
            }
          }
        }
      }
    });

    // console.log(especialidadeId);
    // console.log(habilitacaoId);
    // console.log(municipioId);
    return aux;
  };

  pesquisar = async () => {
    this.setState({ loading: true });
    try {
      let { data } = await api.get('/profissionals');
      data = this.aplicarFiltro(data);
      this.setState({ resultados: [] }, () => {
        this.setState({ resultados: [...data] }, () => {
          this.setState({ icones: this.state.resultados.map(() => true) });
        });
      });
    } catch (e) {
      // console.log(e);
    } finally {
      this.setState({ loading: false, botaoPressionado: true });
    }
  };

  componentDidMount = async () => {
    try {
      const { data } = await api.get('/especialidades');
      this.setState({
        especialidadeItens: [{ id: 0, nome: 'Todos' }, ...data.data],
      });
    } catch (e) {
      // console.log(e);
    }

    try {
      const { data } = await api.get('/habilitacaos');
      this.setState({
        habilitacaoItens: [{ id: 0, nome: 'Todos' }, ...data.data],
      });
    } catch (e) {
      // console.log(e);
    }

    try {
      const { data } = await api.get('/municipios');
      this.setState({ municipioItens: [{ id: 0, nome: 'Todos' }, ...data] });
    } catch (e) {
      // console.log(e);
    }
  };

  upperLowerCase = s => s.split('')[0].toUpperCase()
    + s
      .toLowerCase()
      .split('')
      .splice(1)
      .join('');

  nomeMuitoGrande = s => (s.split("").length > 14
      ? s
          .split("")
          .slice(0, 14)
          .join("") + "..."
      : s);

  render() {
    return (
      <View style={styles.header}>
        <Header title="Profissionais" />

        <ScrollView style={styles.container}>
          <View>
            <View style={styles.card}>
              <Text style={styles.title}>Especialidade</Text>
              <View style={styles.dropdownBorder}>
                <Dropdown
                  rippleInsets={{ top: 28, bottom: 6 }}
                  baseColor={colors.regular}
                  data={this.state.especialidadeItens}
                  valueExtractor={({ nome }) => nome}
                  onChangeText={(value, index, data) => {
                    this.setState({ especialidadeId: data[index].id });
                  }}
                  value={this.state.especialidadeItens[0].nome}
                />
              </View>

              <Text style={styles.title}>Habilitação</Text>
              <View style={styles.dropdownBorder}>
                <Dropdown
                  rippleInsets={{ top: 28, bottom: 6 }}
                  baseColor={colors.regular}
                  data={this.state.habilitacaoItens}
                  valueExtractor={({ nome }) => nome}
                  onChangeText={(value, index, data) => {
                    this.setState({ habilitacaoId: data[index].id });
                  }}
                  value={this.state.habilitacaoItens[0].nome}
                />
              </View>

              <Text style={styles.title}>Município</Text>
              <View style={styles.dropdownBorder}>
                <Dropdown
                  rippleInsets={{ top: 28, bottom: 6 }}
                  baseColor={colors.regular}
                  data={this.state.municipioItens}
                  valueExtractor={({ nome }) => nome}
                  onChangeText={(value, index, data) => {
                    this.setState({ municipioId: data[index].id });
                  }}
                  value={this.state.municipioItens[0].nome}
                />
              </View>

              <Text style={styles.title}>Nome</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={text => this.setState({ nome: text })}
                value={this.state.text}
                onSubmitEditing={this.pesquisar}
              />

              <View style={{ alignItems: 'center' }}>
                <TouchableOpacity
                  style={styles.button}
                  activeOpacity={0.7}
                  onPress={() => {
                    this.pesquisar();
                  }}
                >
                  {this.state.loading ? (
                    <ActivityIndicator size="small" color="#FFF" />
                  ) : (
                    <Text style={styles.buttonText}>Pesquisar</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {!!this.state.botaoPressionado && (
            <View
              style={{ ...styles.card, marginBottom: 30, paddingBottom: 7 }}
            >
              {this.state.resultados.length === 0 ? (
                <View style={{ alignItems: 'center' }}>
                  <Text style={results.empty}>Nenhum resultado encontrado</Text>
                </View>
              ) : (
                <View>
                  {this.state.resultados.map((v, i, a) => (
                    <View key={i}>
                      <Collapse
                        onToggle={() => {
                          const aux = this.state.icones.map((v, index, a) => (index === i
                              ? !this.state.icones[index]
                              : this.state.icones[index]),);
                          this.setState({ icones: [...aux] });
                        }}
                      >
                        <CollapseHeader style={results.title}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}
                          >
                            <Text style={results.titleText}>
                              {v.nome.split(' ').length > 1
                                ? this.nomeMuitoGrande(
                                  this.upperLowerCase(
                                    `${v.nome.split(' ')[0]} `,
                                  )
                                      + this.upperLowerCase(
                                        v.nome
                                          .split(' ')
                                          .slice(-1)
                                          .join(' '),
                                      ),
                                )
                                : this.nomeMuitoGrande(
                                  this.upperLowerCase(v.nome),
                                )}
                            </Text>
                            <Text style={results.titleTextMenor}>
                              {`${v.cro.split('-')[2]}/${v.cro.split('-')[0]}`}
                            </Text>
                          </View>

                          <Icon
                            name={
                              this.state.icones[i]
                                ? 'plus-circle'
                                : 'minus-circle'
                            }
                            size={28}
                            color="#8B0000"
                          />
                        </CollapseHeader>
                        <CollapseBody style={results.listItemContainer}>
                          <Text style={results.listItem}>
                            <Text style={{ fontWeight: 'bold' }}>
                              Nome completo:{' '}
                            </Text>
                            {`${v.nome}`}
                          </Text>
                          <Text style={results.listItem}>
                            <Text style={{ fontWeight: 'bold' }}>
                              Especialidade:{' '}
                            </Text>
                            {`${v.especialidades
                              .map(i => i.nome)
                              .filter(i => !!i)
                              .join(', ')}`}
                          </Text>
                          <Text style={results.listItem}>
                            <Text style={{ fontWeight: 'bold' }}>
                              Habilitação:{' '}
                            </Text>
                            {`${v.habilitacoes
                              .map(i => i.nome)
                              .filter(i => !!i)
                              .join(', ')}`}
                          </Text>
                          <Text style={results.listItem}>
                            <Text style={{ fontWeight: 'bold' }}>
                              Município:{' '}
                            </Text>
                            {`${v.municipio.nome}`}
                          </Text>
                          <Text style={results.listItem}>
                            <Text style={{ fontWeight: 'bold' }}>
                              Endereço:{' '}
                            </Text>
                            {`${[v.bairro, v.logradouro, v.numero, v.cep]
                              .filter(i => !!i)
                              .join(', ')}`}
                          </Text>
                          <Text style={results.listItem}>
                            <Text style={{ fontWeight: 'bold' }}>
                              Contato:{' '}
                            </Text>
                            {`${v.fone_2}`}
                          </Text>
                        </CollapseBody>
                      </Collapse>
                    </View>
                  ))}
                </View>
              )}
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}
